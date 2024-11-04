const { getGatosDB, addGatoDB, updateGatoDB, 
    deleteGatoDB, getGatoPorCodigoDB, getGatosPorPadrinhoDB  } = require('../usecases/gatoUseCases');

const getGatos = async (request, response) => {
    await getGatosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os gatos: ' + err
        }));
}

const addGato = async (request, response) => {
    await addGatoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Gato criado com sucesso',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao adicionar o gato: ' + err
        }));
}

const updateGato = async (request, response) => {
    await updateGatoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Gato atualizado com sucesso',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao atualizar o gato: ' + err
        }));
}

const deleteGato = async (request, response) => {
    await deleteGatoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao remover o gato: ' + err
        }));
}

const getGatoPorCodigo = async (request, response) => {
    await getGatoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao recuperar o gato: ' + err
        }));
}

const getGatosPorPadrinho = async (request, response) => {
    await getGatosPorPadrinhoDB(parseInt(request.params.padrinhoId))
        .then(data => {
            if (data.length === 0) {
                return response.status(200).json({
                    status: 'success',
                    message: 'Nenhum gato vinculado a este ID de padrinho.'
                });
            }
            response.status(200).json(data);
        })
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao recuperar gatos para o padrinho: ' + err
        }));
};

module.exports = {
    getGatos, addGato, updateGato, deleteGato, getGatoPorCodigo, getGatosPorPadrinho
};