'use strict';

const db = require('../../db');

const deputado = {
    'id': Number,
    'nome': String,
    'nomeCivil': String,
    'sexo': String,
    'dataNascimento': String,
    'municipioNascimento': String,
    'escolaridade': String,
    'siglaPartido': String,
    'siglaUf': String,
    'urlFoto': String,
    'situacao': String,
    'telefone': String,
    'email': String,
    'redeSocial': String
};

const schema = new db.mongoose.Schema(deputado, { versionKey: false });

const model = db.mongoose.model('deputados', schema);

module.exports = model;
