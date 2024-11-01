class Gato {
    constructor(codigo, descricao, vacinas, nome, padrinho_nome, padrinho_id) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.vacinas = vacinas;
        this.nome = nome;
        this.padrinho_nome = padrinho_nome;
        this.padrinho_id = padrinho_id; 
    }
}

module.exports = Gato;