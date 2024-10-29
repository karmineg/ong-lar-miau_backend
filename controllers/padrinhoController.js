const { getPadrinhosDB, addPadrinhoDB, updatePadrinhoDB, 
    deletePadrinhoDB, getPadrinhoPorCodigoDB } = require('../usecases/padrinhoUseCases');

const getPadrinhos = async (request, response) => {
    await getPadrinhosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os padrinhos: ' + err
        }));
}

const addPadrinho = async (request, response) => {
    await addPadrinhoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Padrinho criado com sucesso',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao adicionar o padrinho: ' + err
        }));
}

const updatePadrinho = async (request, response) => {
    await updatePadrinhoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Padrinho atualizado com sucesso',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao atualizar o padrinho: ' + err
        }));
}

const deletePadrinho = async (request, response) => {
    await deletePadrinhoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao remover o padrinho: ' + err
        }));
}

const getPadrinhoPorCodigo = async (request, response) => {
    await getPadrinhoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao recuperar o padrinho: ' + err
        }));
}

module.exports = {
    getPadrinhos, addPadrinho, updatePadrinho, deletePadrinho, getPadrinhoPorCodigo
};