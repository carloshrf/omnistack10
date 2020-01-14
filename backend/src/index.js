const express = require('express');
const mongoose = require('mongoose');
// chamar o routes do routes.js
//mongoose permitirá que a api se conect com o mongodb
const routes = require('./routes')
// inicia o servidor
const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-fwcub.mongodb.net/week10?retryWrites=true&w=majority', {
    // definidos pois dois avisos aparecem sem eles.
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// permitir que express compreenda json
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
app.listen(3333);