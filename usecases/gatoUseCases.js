const { pool } = require('../config');
const Gato = require('../entities/gato');

const getGatosDB = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT gatos.codigo, gatos.descricao, gatos.vacinas, gatos.nome, gatos.padrinho_id, padrinhos.nome AS padrinho_nome
            FROM gatos
            LEFT JOIN padrinhos ON gatos.padrinho_id = padrinhos.codigo
            ORDER BY gatos.descricao
        `);

        return rows.map((gato) =>
            new Gato(gato.codigo, gato.descricao, gato.vacinas, gato.nome, gato.padrinho_nome, gato.padrinho_id)
        );
    } catch (err) {
        throw "Erro: " + err;
    }
};

const addGatoDB = async (body) => {
    try {
        const { descricao, vacinas, nome, padrinhoId } = body;
        const results = await pool.query(`INSERT INTO gatos (descricao, vacinas, nome, padrinho_id)
            VALUES ($1, $2, $3, $4) RETURNING codigo, descricao, vacinas, nome, padrinho_id`, 
            [descricao, vacinas, nome, padrinhoId]);
        const gato = results.rows[0];
        return new Gato(gato.codigo, gato.descricao, gato.vacinas, gato.nome, gato.padrinho_nome, gato.padrinho_id)
    } catch (err) {
        throw "Erro ao inserir o gato: " + err;
    }
}

const updateGatoDB = async (body) => {
    try {
        const { codigo, descricao, vacinas, nome, padrinhoId } = body;
        const results = await pool.query(`UPDATE gatos SET descricao = $2, vacinas = $3, nome = $4, padrinho_id = $5
            WHERE codigo = $1 RETURNING codigo, descricao, vacinas, nome, padrinho_id`, 
            [codigo, descricao, vacinas, nome, padrinhoId]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const gato = results.rows[0];
        return new Gato(gato.codigo, gato.descricao, gato.vacinas, gato.nome, gato.padrinho_nome, gato.padrinho_id)
    } catch (err) {
        throw "Erro ao alterar o gato: " + err;
    }
}

const deleteGatoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM gatos WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Gato removido com sucesso!";
        }
    } catch (err) {
        throw "Erro ao remover o gato: " + err;
    }
}

const getGatoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM gatos WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const gato = results.rows[0];
            return new Gato(gato.codigo, gato.descricao, gato.vacinas, gato.nome, gato.padrinho_nome, gato.padrinho_id)
        }
    } catch (err) {
        throw "Erro ao recuperar o gato: " + err;
    }
}

const getGatosPorPadrinhoDB = async (padrinhoId) => {
    try {
        const { rows } = await pool.query(`
            SELECT gatos.codigo, gatos.descricao, gatos.vacinas, gatos.nome, gatos.padrinho_id, padrinhos.nome AS padrinho_nome
            FROM gatos
            LEFT JOIN padrinhos ON gatos.padrinho_id = padrinhos.codigo
            WHERE gatos.padrinho_id = $1
            ORDER BY gatos.descricao
        `, [padrinhoId]);

        if (rows.length === 0) {
            return []; 
        }

        return rows.map((gato) =>
            new Gato(gato.codigo, gato.descricao, gato.vacinas, gato.nome, gato.padrinho_nome, gato.padrinho_id)
        );
    } catch (err) {
        throw "Erro ao buscar gatos por padrinho: " + err;
    }
};

module.exports = { getGatosDB, addGatoDB, updateGatoDB, deleteGatoDB, getGatoPorCodigoDB, getGatosPorPadrinhoDB };