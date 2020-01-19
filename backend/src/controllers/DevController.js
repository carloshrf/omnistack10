const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray');
const Dev = require('../models/Dev');
const { findConnections, sendMessage } = require('../websocket');

//index, show, Store, Update, Destroy
module.exports = {
    async index (request, response) {
        const devs = await Dev.find(/*{name:"diego"}*/);

        return response.json(devs);
    },

    async store (request, response) {
        //desestruturação, irá buscar no corpo do request a variavel nomeada como github_username
        const { github_username, techs, latitude, longitude } = request.body;
    //========Verificará se há registro com o mesmo usuário
        let dev = await Dev.findOne({ github_username });
        
            if (!dev) {

                // com o Axios, está se buscando na api externa do github as informaçãoes de um usuário especificado pela var
            // await antes da chamada para esperar a resposta
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            // se não houver name, pegará valor de login
            let { name = login, avatar_url, bio } = apiResponse.data;
            // receberá o valor de techs que será transformado em array com o split que separará elementos pelo virgula, após o map percorrerá o array e removerá com o trim() os espaços antes e depois
            const techsArray = parseStringAsArray(techs);/*techs.split(',').map(tech => tech.trim());*/
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            // Cadastrar o Dev
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
            //Filtar as conexões websocket para buscar as que satisfaçam os critérios de busca de max 10km de dist e ao menos uma das tech filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )
            // Envia a mensagem para o cliente
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
    //=============
        return response.json(dev);
        //console.log( name, avatar_url, bio, github_username);
        // console.log(apiResponse.data); mostrará todo body da resposta
        // console.log(request.query); para get
        // console.log(request.params); para delete, retorna a id como do ex: localhost:3333/users/1 retorna {id='1'}
        // console.log(request.body);
        //return response.json({ message: 'Hello Omnistack' });
    }
}