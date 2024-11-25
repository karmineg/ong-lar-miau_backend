const { Router } = require('express');

const { getGatos, addGato, updateGato,
    deleteGato, getGatoPorCodigo, getGatosPorPadrinho } = require('../controllers/gatoController');

    const { verificaJWT } = require('../controllers/segurancaController')

const rotasGatos = new Router();

rotasGatos.route('/gato')
           .get(verificaJWT, getGatos)
           .post(verificaJWT, addGato)
           .put(verificaJWT, updateGato);

rotasGatos.route('/gato/:codigo')
           .delete(verificaJWT, deleteGato)
           .get(verificaJWT, getGatoPorCodigo);

rotasGatos.route('/gato/padrinho/:padrinhoId')
           .get(verificaJWT, getGatosPorPadrinho);

module.exports = { rotasGatos };