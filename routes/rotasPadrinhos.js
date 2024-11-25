const { Router } = require('express');

const { getPadrinhos, addPadrinho, updatePadrinho,
    deletePadrinho, getPadrinhoPorCodigo } = require('../controllers/padrinhoController');

    const { verificaJWT } = require('../controllers/segurancaController')
    
const rotasPadrinhos = new Router();

rotasPadrinhos.route('/padrinho')
               .get(verificaJWT, getPadrinhos)
               .post(verificaJWT, addPadrinho)
               .put(verificaJWT, updatePadrinho);

rotasPadrinhos.route('/padrinho/:codigo')
               .delete(verificaJWT, deletePadrinho)
               .get(verificaJWT, getPadrinhoPorCodigo);

module.exports = { rotasPadrinhos };