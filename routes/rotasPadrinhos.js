const { Router } = require('express');

const { getPadrinhos, addPadrinho, updatePadrinho,
    deletePadrinho, getPadrinhoPorCodigo } = require('../controllers/padrinhoController');

const rotasPadrinhos = new Router();

rotasPadrinhos.route('/padrinho')
               .get(getPadrinhos)
               .post(addPadrinho)
               .put(updatePadrinho);

rotasPadrinhos.route('/padrinho/:codigo')
               .delete(deletePadrinho)
               .get(getPadrinhoPorCodigo);

module.exports = { rotasPadrinhos };