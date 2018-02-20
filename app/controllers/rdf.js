'use strict';

const fs = require('fs')

const Rdf = require('../models/rdf');

const all = async (req, res, next) => {
    var rdf;
    var result;

    try {
        rdf = await Rdf.find({}, [], { sort: {} });

        result = await make(rdf);
    } catch (e) {
        res.status(555).send(e);
    }

    res.status(200).send(result);
};

const set = async (req, res, next) => {
    var rdf = req.body;
    var result;

    try {
        result = await Rdf.create(rdf);
    } catch (e) {
        res.status(555).send(e);
    }

    res.status(200).send(result);
};


const make = async (rdf) => {
    var wstream = fs.createWriteStream('public/rdf.ttl');

    wstream.write('@base <http://smb.com> .\n');
    wstream.write('@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n');
    wstream.write('@prefix Politico: <http://smb.com/Politico> .\n');
    wstream.write('@prefix Eleitor: <http://smb.com/Eleitor> .\n');
    wstream.write('@prefix Proposicao: <http://smb.com/Proposicao> .\n');
    wstream.write('\n');

    for (var i in rdf) {
        wstream.write('<Proposicao/' + rdf[i]._id + '> rdf:type <Proposicao> .\n');
        wstream.write('<Proposicao/' + rdf[i]._id + '> <Proposicao#hash> "' + rdf[i]._id + '" .\n');
        wstream.write('<Proposicao/' + rdf[i]._id + '> <Proposicao#id> ' + rdf[i].proposicao.id + ' .\n');
        wstream.write('<Proposicao/' + rdf[i]._id + '> <Proposicao#nome> "' + rdf[i].proposicao.nome + '" .\n');
        wstream.write('<Proposicao/' + rdf[i]._id + '> <Proposicao#linkInteiroTeor> "' + rdf[i].proposicao.linkInteiroTeor + '" .\n');
        wstream.write('<Proposicao/' + rdf[i]._id + '> <Proposicao#autorPartido> "' + rdf[i].proposicao.autorPartido + '" .\n');
        wstream.write('<Proposicao/' + rdf[i]._id + '> <Proposicao#autorUf> "' + rdf[i].proposicao.autorUf + '" .\n');
        wstream.write('<Proposicao/' + rdf[i]._id + '> <Proposicao#autorId> "' + rdf[i].proposicao.autorId + '" .\n');
        wstream.write('<Proposicao/' + rdf[i]._id + '> <Proposicao#autorNome> "' + rdf[i].proposicao.autorNome + '" .\n');
        wstream.write('<Proposicao/' + rdf[i]._id + '> <Proposicao#votoDeputado> "' + rdf[i].proposicao.votoDeputado + '" .\n');
        wstream.write('<Proposicao/' + rdf[i]._id + '> <Proposicao#votoEleitor> "' + rdf[i].proposicao.votoEleitor + '" .\n');

        wstream.write('<Politico/' + rdf[i]._id + '> rdf:type <Politico> .\n');
        wstream.write('<Politico/' + rdf[i]._id + '> <Politico#hash> "' + rdf[i]._id + '" .\n');
        wstream.write('<Politico/' + rdf[i]._id + '> <Politico#id> ' + rdf[i].deputado.id + ' .\n');
        wstream.write('<Politico/' + rdf[i]._id + '> <Politico#nome> "' + rdf[i].deputado.nome + '" .\n');
        wstream.write('<Politico/' + rdf[i]._id + '> <Politico#siglaUf> "' + rdf[i].deputado.siglaUf + '" .\n');
        wstream.write('<Politico/' + rdf[i]._id + '> <Politico#siglaPartido> "' + rdf[i].deputado.siglaPartido + '" .\n');
        wstream.write('<Politico/' + rdf[i]._id + '> <Politico#escolaridade> "' + rdf[i].deputado.escolaridade + '" .\n');
        wstream.write('<Politico/' + rdf[i]._id + '> <Politico#sexo> "' + rdf[i].deputado.sexo + '" .\n');
        wstream.write('<Politico/' + rdf[i]._id + '> <Politico#idade> ' + (new Date().getFullYear() - rdf[i].deputado.dataNascimento.substr(0, 4)) + ' .\n');

        wstream.write('<Eleitor/' + rdf[i]._id + '> rdf:type <Eleitor> .\n');
        wstream.write('<Eleitor/' + rdf[i]._id + '> <Eleitor#hash> "' + rdf[i]._id + '" .\n');
        wstream.write('<Eleitor/' + rdf[i]._id + '> <Eleitor#estado> "' + rdf[i].eleitor.estado + '" .\n');
        wstream.write('<Eleitor/' + rdf[i]._id + '> <Eleitor#ocupacao> ' + rdf[i].eleitor.ocupacao + ' .\n');
        wstream.write('<Eleitor/' + rdf[i]._id + '> <Eleitor#escolaridade> "' + rdf[i].eleitor.escolaridade + '" .\n');
        wstream.write('<Eleitor/' + rdf[i]._id + '> <Eleitor#sexo> "' + rdf[i].eleitor.sexo + '" .\n');
        wstream.write('<Eleitor/' + rdf[i]._id + '> <Eleitor#idadeMin> ' + rdf[i].eleitor.faixa.min + ' .\n');
        wstream.write('<Eleitor/' + rdf[i]._id + '> <Eleitor#idadeMax> ' + rdf[i].eleitor.faixa.max + ' .\n');
    }

    wstream.end();

    return true;
};

module.exports = { all, set };
