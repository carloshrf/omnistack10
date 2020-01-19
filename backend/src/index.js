const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
// chamar o routes do routes.js
//mongoose permitirá que a api se conect com o mongodb
const routes = require('./routes')
const { setupWebsocket } = require('./websocket')
// inicia o servidor
const app = express();
const server = http.Server(app); //pode substituir o express

setupWebsocket(server); //se refere ao server que assumiu o express e está sendo utilizado no arquivo websocket.js

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-fwcub.mongodb.net/week10?retryWrites=true&w=majority', {
    // definidos pois dois avisos aparecem sem eles.
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// permitir que express compreenda json
app.use(cors(/*{ orign: 'http://localhost:3000' }*/));
app.use(express.json());
app.use(routes);
// Métodos HTTP: GET, POST, PUT, DELETE
// ===================
// Query Params: request.query (filtros, ordenação, paginação, ...)
// Route Params: request.params (identificar um recurso na alteração ou remoção)
// Body: request.body (dados para criação ou alteração de um registro)
// ===================
// MongoDB (não-relacional)
// define a porta de acesso
// app.listen(3333)
server.listen(3333);