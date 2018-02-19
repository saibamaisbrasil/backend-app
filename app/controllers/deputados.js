'use strict';

const fetch = require('node-fetch');
const parser = require('xml2json');
const Deputado = require('../models/deputado');

const all = async (req, res, next) => {
    var deputados;

    try {
        deputados = await Deputado.find({}, [], { sort: { nome: 'asc' } });
    } catch (e) {
        res.status(500).send(e);
    }

    res.status(200).send(deputados);
};

const get = async (req, res, next) => {
    var id = req.params.id;
    var deputado;

    try {
        deputado = await Deputado.findOne({ id: id }, []);
    } catch (e) {
        res.status(500).send(e);
    }

    res.status(200).send(deputado);
};

const rebase = async (req, res, next) => {
    var deputados = [];

    try {
        await Deputado.remove();

        var response = await fetch('http://www.camara.leg.br/SitCamaraWS/Deputados.asmx/ObterDeputados');
        var xml = await response.buffer();
        var data = await JSON.parse(parser.toJson(xml));

        for (let temp of data.deputados.deputado) {
            var response2 = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados/' + temp.ideCadastro);
            var xml2 = await response2.buffer();
            var data2 = await JSON.parse(xml2);

            var deputado = {
                id: data2.dados.id,
                nome: data2.dados.ultimoStatus.nome,
                nomeCivil: data2.dados.nomeCivil,
                sexo: data2.dados.sexo,
                dataNascimento: data2.dados.dataNascimento,
                municipioNascimento: data2.dados.municipioNascimento,
                escolaridade: data2.dados.escolaridade,
                siglaPartido: data2.dados.ultimoStatus.siglaPartido,
                siglaUf: data2.dados.ultimoStatus.siglaUf,
                urlFoto: data2.dados.ultimoStatus.urlFoto,
                situacao: data2.dados.ultimoStatus.situacao,
                telefone: data2.dados.ultimoStatus.gabinete.telefone,
                email: data2.dados.ultimoStatus.gabinete.email
            };

            deputados.push(deputado);
        }

        Deputado.create(deputados);
    } catch (e) {
        res.status(500).send(e);
    }

    res.status(200).send();
};

module.exports = { all, get, rebase };
