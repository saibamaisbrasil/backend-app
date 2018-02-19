'use strict';

const fetch = require('node-fetch');
const parser = require('xml2json');
const Votacao = require('../models/votacao');
const Proposicao = require('../models/proposicao');

const all = async (req, res, next) => {
    var votacoes;

    try {
        votacoes = await Votacao.find({}, [], { sort: { nome: 'asc' } });
    } catch (e) {
        res.status(555).send(e);
    }

    res.status(200).send(votacoes);
};

const get = async (req, res, next) => {
    var id = req.params.id;
    var votacao;

    try {
        votacao = await Votacao.findOne({ idProposicao: id }, []);
    } catch (e) {
        res.status(555).send(e);
    }

    res.status(200).send(votacao);
};

const rebase = async (req, res, next) => {
    var proposicoes;
    var votacoes = [];

    try {
        proposicoes = await Proposicao.find({}, [], { sort: { nome: 'asc' } });

        await Votacao.remove();

        for (let proposicao of proposicoes) {
            var votos = [];

            var response = await fetch('http://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ObterVotacaoProposicao?tipo=' + proposicao.tipo + '&numero=' + proposicao.numero + '&ano=' + proposicao.ano);
            var xml = await response.buffer();
            var temp = await JSON.parse(parser.toJson(xml));
            // verifica quando tem mais de uma votacao e pega a primeira (porque os caras la da camara nao tem um padrao...)
            var data = Array.isArray(temp.proposicao.Votacoes.Votacao) ? temp.proposicao.Votacoes.Votacao[0] : temp.proposicao.Votacoes.Votacao;

            for (let temp of data.votos.Deputado) {
                var voto = {
                    id: temp.ideCadastro,
                    voto: temp.Voto
                };

                votos.push(voto);
            }

            var votacao = {
                idProposicao: proposicao.id,
                codSessao: data.codSessao,
                resumo: data.Resumo,
                data: data.Data,
                objeto: data.ObjVotacao,
                votos: votos
            };

            votacoes.push(votacao);
        }

        Votacao.create(votacoes);
    } catch (e) {
        res.status(500).send(e);
    }

    res.status(200).send();
};

module.exports = { all, get, rebase };
