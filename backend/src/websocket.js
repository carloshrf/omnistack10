const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        //console.log(socket.id);
        //console.log(socket.handshake.query); //recebe os parametros do socket cliente front

        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({ //push serve para adicionar valores no array
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
        /*
        setTimeout(() => { //backend retornando uma info para a front sem requisição front
            socket.emit('message', 'Hello Omnistack')
        }, 3000 ); //3s
        */
    });
};

exports.findConnections = (coordinates, techs) => { //coordenadas do dev cadastrado com as conex do websocket
    console.log("2");
    console.log(coordinates.latitude);
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
        && connection.techs.some(item => techs.includes(item)) //funcao some retorna true se ao menos uma das condições forem satisfatórias
    })
}
//enviar mensagem para usuários quando um novo user é cadastrado dentro dos parametros de busca
exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}