'use strict';

const Proposicao = require('../models/proposicao');

const all = async (req, res, next) => {
    var proposicoes;
    var temas;
    var subtemas = [];

    try {
        proposicoes = await Proposicao.find({}, [], { sort: { nome: 'asc' } });

        temas = await proposicoes.map((elem) => elem.tema);

        // para cada tema separa os subtemas (alguns temas possuem subtemas separados por ;)
        for (let tema of temas) {
            let temp = await tema.split('; ');

            // adiciona cada subtema em um array
            for (let t of temp) {
                await subtemas.push(t);
            }
        }

        // remove duplicados...
        subtemas = await subtemas.filter((elem, index, array) => array.indexOf(elem) == index);

        // ordena alfabeticamente
        await subtemas.sort();
    } catch (e) {
        res.status(555).send(e);
    }

    res.status(200).send(subtemas);
};

const get = async (req, res, next) => {
    var id = req.params.id;
    var proposicao;
    var temas;
    var subtemas = [];

    try {
        proposicao = await Proposicao.findOne({ id: id }, []);

        let temp = await proposicao.tema.split('; ');

        // adiciona cada subtema em um array
        for (let t of temp) {
            await subtemas.push(t);
        }

        // ordena alfabeticamente
        await subtemas.sort();
    } catch (e) {
        res.status(555).send(e);
    }

    res.status(200).send(subtemas);
};

module.exports = { all, get };
