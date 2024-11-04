const { Router } = require('express');

const { getGatos, addGato, updateGato,
    deleteGato, getGatoPorCodigo, getGatosPorPadrinho } = require('../controllers/gatoController');

const rotasGatos = new Router();

rotasGatos.route('/gato')
           .get(getGatos)
           .post(addGato)
           .put(updateGato);

rotasGatos.route('/gato/:codigo')
           .delete(deleteGato)
           .get(getGatoPorCodigo);

rotasGatos.route('/gato/padrinho/:padrinhoId')
           .get(getGatosPorPadrinho);

module.exports = { rotasGatos };