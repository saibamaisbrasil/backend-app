'use strict';

const db = require('../../db');

const rdf = {
    proposicao: {},
    eleitor: {},
    deputado: {}
    // id: String,
    // nome: String,
    // tipo: String,
    // nomeTipo: String,
    // numero: String,
    // ano: String,
    // tema: String,
    // ementa: String,
    // explicacaoEmenta: String,
    // autorNome: String,
    // autorId: String,
    // autorUf: String,
    // autorPartido: String,
    // dataApresentacao: String,
    // situacao: String,
    // linkInteiroTeor: String,
    // semelhantes: [],
    // votoEleitor: String,
    // eleitor: {},
    // deputado: {},
    // votoDeputado: String
};

const schema = new db.mongoose.Schema(rdf);

const model = db.mongoose.model('rdf', schema);

module.exports = model;
