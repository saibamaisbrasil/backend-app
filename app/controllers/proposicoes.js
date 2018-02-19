'use strict';

const fetch = require('node-fetch');
const parser = require('xml2json');
const Proposicao = require('../models/proposicao');

const all = async (req, res, next) => {
    var proposicoes;

    try {
        proposicoes = await Proposicao.find({}, [], { sort: { nome: 'asc' } });
    } catch (e) {
        res.status(555).send(e);
    }

    res.status(200).send(proposicoes);
};

const get = async (req, res, next) => {
    var id = req.params.id;
    var proposicao;

    try {
        proposicao = await Proposicao.findOne({ id: id }, []);
    } catch (e) {
        res.status(555).send(e);
    }

    res.status(200).send(proposicao);
};

const rebase = async (req, res, next) => {
    var proposicoes = [];

    try {
        await Proposicao.remove();

        var response = await fetch('http://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ListarProposicoesVotadasEmPlenario?ano=2017&tipo=');
        var xml = await response.buffer();
        var data = await JSON.parse(parser.toJson(xml));

        for (let temp of data.proposicoes.proposicao) {
            var response2 = await fetch('http://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ObterProposicaoPorID?IdProp=' + temp.codProposicao);
            var xml2 = await response2.buffer();
            var data2 = await JSON.parse(parser.toJson(xml2));

            var proposicao = {
                id: data2.proposicao.idProposicao,
                nome: data2.proposicao.nomeProposicao,
                tipo: data2.proposicao.tipo,
                nomeTipo: data2.proposicao.tipoProposicao,
                numero: data2.proposicao.numero,
                ano: data2.proposicao.ano,
                tema: data2.proposicao.tema,
                ementa: data2.proposicao.Ementa,
                explicacaoEmenta: data2.proposicao.ExplicacaoEmenta,
                autorNome: data2.proposicao.Autor,
                autorId: data2.proposicao.ideCadastro,
                autorUf: data2.proposicao.ufAutor,
                autorPartido: data2.proposicao.partidoAutor,
                dataApresentacao: data2.proposicao.DataApresentacao,
                situacao: data2.proposicao.Situacao,
                linkInteiroTeor: data2.proposicao.LinkInteiroTeor
            };

            proposicoes.push(proposicao);
        }

        Proposicao.create(proposicoes);
    } catch (e) {
        res.status(500).send(e);
    }

    res.status(200).send();
};

module.exports = { all, get, rebase };
