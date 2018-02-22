'use strict';

const router = require('express').Router();

const DeputadosCtrl = require('./controllers/deputados');
const PartidosCtrl = require('./controllers/partidos');
const EstadosCtrl = require('./controllers/estados');
const ProposicoesCtrl = require('./controllers/proposicoes');
const TemasCtrl = require('./controllers/temas');
const VotacoesCtrl = require('./controllers/votacoes');
const RdfCtrl = require('./controllers/rdf');
const TwitterCtrl = require('./controllers/twitter');

const routes = () => {
    router.get('/deputados', DeputadosCtrl.all);
    router.get('/deputados/:id', DeputadosCtrl.get);
    router.get('/deputadosrebase', DeputadosCtrl.rebase);

    router.get('/partidos', PartidosCtrl.all);
    router.get('/partidos/:id', PartidosCtrl.get);
    router.get('/partidosrebase', PartidosCtrl.rebase);

    router.get('/estados', EstadosCtrl.all);
    router.get('/estados/:id', EstadosCtrl.get);
    router.get('/estadosrebase', EstadosCtrl.rebase);

    router.get('/proposicoes', ProposicoesCtrl.all);
    router.get('/proposicoes/:id', ProposicoesCtrl.get);
    router.get('/proposicoesrebase', ProposicoesCtrl.rebase);

    router.get('/temas', TemasCtrl.all);
    router.get('/temas/:id', TemasCtrl.get);

    router.get('/votacoes', VotacoesCtrl.all);
    router.get('/votacoes/:id', VotacoesCtrl.get);
    router.get('/votacoesrebase', VotacoesCtrl.rebase);

    router.get('/rdf', RdfCtrl.all);
    router.post('/rdf', RdfCtrl.set);

    router.post('/twitter', TwitterCtrl.set);

    return router;
};

module.exports = routes;
