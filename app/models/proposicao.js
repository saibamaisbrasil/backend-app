'use strict';

const db = require('../../db');

const proposicao = {
    id: String,
    nome: String,
    tipo: String,
    nomeTipo: String,
    numero: String,
    ano: String,
    tema: String,
    ementa: String,
    explicacaoEmenta: String,
    autorNome: String,
    autorId: String,
    autorUf: String,
    autorPartido: String,
    dataApresentacao: String,
    situacao: String,
    linkInteiroTeor: String
};

const schema = new db.mongoose.Schema(proposicao, { versionKey: false });

const model = db.mongoose.model('proposicoes', schema);

module.exports = model;
