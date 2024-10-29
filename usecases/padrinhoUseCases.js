const { pool } = require('../config');
const Padrinho = require('../entities/padrinho');

const getPadrinhosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM padrinhos ORDER BY nome`);
        return rows.map((padrinho) => 
            new Padrinho(padrinho.codigo, padrinho.nome, padrinho.telefone, padrinho.endereco, padrinho.email));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addPadrinhoDB = async (body) => {
    try {
        const { nome, telefone, endereco, email } = body;
        const results = await pool.query(`INSERT INTO padrinhos (nome, telefone, endereco, email)
            VALUES ($1, $2, $3, $4) RETURNING codigo, nome, telefone, endereco, email`, 
            [nome, telefone, endereco, email]);
        const padrinho = results.rows[0];
        return new Padrinho(padrinho.codigo, padrinho.nome, padrinho.telefone, padrinho.endereco, padrinho.email);
    } catch (err) {
        throw "Erro ao inserir o padrinho: " + err;
    }
}

const updatePadrinhoDB = async (body) => {
    try {
        const { codigo, nome, telefone, endereco, email } = body;
        const results = await pool.query(`UPDATE padrinhos SET nome = $2, telefone = $3, endereco = $4, email = $5
            WHERE codigo = $1 RETURNING codigo, nome, telefone, endereco, email`, 
            [codigo, nome, telefone, endereco, email]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const padrinho = results.rows[0];
        return new Padrinho(padrinho.codigo, padrinho.nome, padrinho.telefone, padrinho.endereco, padrinho.email);
    } catch (err) {
        throw "Erro ao alterar o padrinho: " + err;
    }
}

const deletePadrinhoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM padrinhos WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Padrinho removido com sucesso!";
        }
    } catch (err) {
        throw "Erro ao remover o padrinho: " + err;
    }
}

const getPadrinhoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM padrinhos WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const padrinho = results.rows[0];
            return new Padrinho(padrinho.codigo, padrinho.nome, padrinho.telefone, padrinho.endereco, padrinho.email);
        }
    } catch (err) {
        throw "Erro ao recuperar o padrinho: " + err;
    }
}

module.exports = { getPadrinhosDB, addPadrinhoDB, updatePadrinhoDB, deletePadrinhoDB, getPadrinhoPorCodigoDB };