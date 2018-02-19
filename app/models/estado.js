'use strict';

const db = require('../../db');

const estado = {
    id: String,
    sigla: String,
    nome: String
};

const schema = new db.mongoose.Schema(estado, { versionKey: false });

const model = db.mongoose.model('estados', schema);

module.exports = model;
