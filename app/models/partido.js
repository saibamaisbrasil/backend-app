'use strict';

const db = require('../../db');

const partido = {
    id: Number,
    sigla: String,
    nome: String
};

const schema = new db.mongoose.Schema(partido, { versionKey: false });

const model = db.mongoose.model('partidos', schema);

module.exports = model;
