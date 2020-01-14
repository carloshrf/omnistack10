//quando se quer importar algo especifico, no caso do express, se põe as chaves com o recuros a ser importado
const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();
// define a rota ; a seta com os parenteses dispensa digitar o function(){}
// utilizado json, mas podendo ser substituido por send, seguido pela string. Funciona como echo
// async usado no inicio da função caso a mesma tenha uma demora em certo momento
routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);
//permite que o routes seja reconhecido pela api como um todo
module.exports = routes;