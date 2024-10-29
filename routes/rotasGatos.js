const { Router } = require('express');

const { getGatos, addGato, updateGato,
    deleteGato, getGatoPorCodigo } = require('../controllers/gatoController');

const rotasGatos = new Router();

rotasGatos.route('/gato')
           .get(getGatos)
           .post(addGato)
           .put(updateGato);

rotasGatos.route('/gato/:codigo')
           .delete(deleteGato)
           .get(getGatoPorCodigo);

module.exports = { rotasGatos };