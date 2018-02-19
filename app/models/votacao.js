'use strict';

const db = require('../../db');

const votacao = {
    idProposicao: String,
    codSessao: String,
    resumo: String,
    data: String,
    objeto: String,
    votos: []
};

const schema = new db.mongoose.Schema(votacao, { versionKey: false });

const model = db.mongoose.model('votacoes', schema);

module.exports = model;
