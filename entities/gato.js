class Gato {
    constructor(codigo, descricao, vacinas, nome, padrinhoId) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.vacinas = vacinas;
        this.nome = nome; 
        this.padrinhoId = padrinhoId; 
    }
}

module.exports = Gato;