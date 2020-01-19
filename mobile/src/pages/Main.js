import React, { useState, useEffect } from 'react';
//import { View } from 'react-native'; // permitir criar em vez de divs, views
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'; // image para importar imagem pelo react-native, Touchopacity: botão com personalização manual, diferente do button, Keyboard para configurar modificações ao abrir o teclado do device (porem não será usado)
import MapView, { Marker, Callout } from 'react-native-maps'; // marker é a marcação no mapa| CallOut faz com que se clique no obj ref, chame informações
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'; //request requisita perm de localização ao user, get recebe a localização do user
import { MaterialIcons } from '@expo/vector-icons'; //importa coleções de icones

import api from '../services/api';
import { setDetectionImagesAsync } from 'expo/build/AR';

function Main({ navigation }) {
    const [devs, setDevs] = useState([]); //receber os devs na consulta a api
    const [currentRegion, setCurrentRegion] = useState(null); //use state é para permitir manipulação da info com a função na direita e var de recebimento na esquerda. null para que inicie com valor nulo
    const [techs, setTechs] = useState(''); //iniciar com valor vazio
    
    useEffect((/*função*/) => { 
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync(); //aguarda usuário responder à requisição de permissão de localização; no caso ele selecionou apenas a info de garantia de permissão caso user a confirme

            if (granted) {
                const {coords} = await getCurrentPositionAsync({ //receberá apenas as coord. do usuário
                    enableHighAccuracy: true,
                });

                const {latitude, longitude} = coords; //recebe apenas a latitude e longitude 

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.03, //Delta é responsável para realizar os calculos de zoom do mapa para foco
                    longitudeDelta: 0.03,
                })
            }
        }

        loadInitialPosition();
    }, [/*quando executar, vazio executa uma vez*/]);

    async function loadDevs() {

        const { latitude, longitude } = currentRegion;
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        //console.log(response.data);

        setDevs(response.data.devs); //atribui à var devs o valor resultante do valor recebido pelo response 
    }

    function handleRegionChanged(region) { //region pois a resposta do onRegionChangeComplete no MapView retorna uma valor region contendo lat long latDelta e longDelta
        //console.log(region);
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null; //só mostrará o mapa ao carregar a info da localização
    }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={ styles.map }>
                {devs.map(dev =>( //map para que cada dev ele crie um marker e é em parenteses pois se quer o retorno da operação
                    <Marker 
                    key={dev._id} //Ao usar o .map é necessário que no primeo elemento possua a tag key com um valor unico
                    coordinate={{ 
                        longitude: dev.location.coordinates[0], 
                        latitude: dev.location.coordinates[1], //pois a latitude é o segundo parametro de localização armazenado no objeto dev 
                    }}> 
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

                        <Callout onPress={() => {
                            //navegação
                            navigation.navigate('Profile', { github_username: dev.github_username }); //chama a prop navigation que é automático em todas paginas e leva para a página profile
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')/*juntar array de item por item com , e espaço*/}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs/*text => setTechs(text)*/}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map:{
        flex: 1 //flex: extender o frame por toda tela
    },
    
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1, //ocupará todo espaço possível na linha
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2, //sombra, por aqui o objeto é elevado para camadas superiores resultando em sombra
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4DFF',
        borderRadius: 25, 
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }

})

export default Main;