const { Router } = require('express');

const { rotasPadrinhos } = require('./rotasPadrinhos');
const { rotasGatos } = require('./rotasGatos');
const { login } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.use(rotasPadrinhos);
rotas.use(rotasGatos);

rotas.route("/login")
   .post(login)

module.exports = rotas;