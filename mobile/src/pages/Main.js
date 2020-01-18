import React, { useState, useEffect } from 'react';
//import { View } from 'react-native'; // permitir criar em vez de divs, views
import { StyleSheet, Image, View, Text, TextInput } from 'react-native'; // image para importar imagem pelo react-native, 
import MapView, { Marker, Callout } from 'react-native-maps'; // marker é a marcação no mapa| CallOut faz com que se clique no obj ref, chame informações
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'; //request requisita perm de localização ao user, get recebe a localização do user

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null); //use state é para permitir manipulação da info com a função na direita e var de recebimento na esquerda. null para que inicie com valor nulo

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

    if (!currentRegion) {
        return null; //só mostrará o mapa ao carregar a info da localização
    }

    return (
        <>
            <MapView initialRegion={currentRegion} style={ styles.map }>
                <Marker coordinate={{ latitude:-3.775338, longitude:-38.488942 }}> 
                    <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/51522793?s=460&v=4' }} />

                    <Callout onPress={() => {
                        //navegação
                        navigation.navigate('Profile', { github_username: 'carloshrf' }); //chama a prop navigation que é automático em todas paginas e leva para a página profile
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>Carlos Henrique</Text>
                            <Text style={styles.devBio}>Ser ou não ser, eis a questão sobre a problemática do fator efeito estufa</Text>
                            <Text style={styles.devTechs}>ReactJS, Node.js, React Native</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>

            <View style={styles.search.Form}>

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
})

export default Main;