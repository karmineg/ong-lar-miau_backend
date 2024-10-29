const { Router } = require('express');

const { rotasPadrinhos } = require('./rotasPadrinhos');
const { rotasGatos } = require('./rotasGatos');

const rotas = new Router();

rotas.use(rotasPadrinhos);
rotas.use(rotasGatos);

module.exports = rotas;