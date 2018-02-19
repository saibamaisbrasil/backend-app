'use strict';

const fetch = require('node-fetch');
const Partido = require('../models/partido');

const all = async (req, res, next) => {
    var partidos;

    try {
        partidos = await Partido.find({}, [], { sort: { nome: 'asc' } });
    } catch (e) {
        res.status(555).send(e);
    }

    res.status(200).send(partidos);
};

const get = async (req, res, next) => {
    var id = req.params.id;
    var partido;

    try {
        partido = await Partido.findOne({ id: id }, []);
    } catch (e) {
        res.status(555).send(e);
    }

    res.status(200).send(partido);
};

const rebase = async (req, res, next) => {
    var partidos = [];

    try {
        await Partido.remove();

        var response = await fetch('https://dadosabertos.camara.leg.br/api/v2/partidos?itens=50&ordem=ASC&ordenarPor=sigla');
        var data = await response.json();

        for (let temp of data.dados) {
            var partido = {
                id: temp.id,
                sigla: temp.sigla,
                nome: temp.nome
            };

            partidos.push(partido);
        }

        Partido.create(partidos);
    } catch (e) {
        res.status(555).send(e);
    }

    res.status(200).send();
};

module.exports = { all, get, rebase };
