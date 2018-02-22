'use strict';

const fs = require('fs')

const Twitter = require('twitter');

const set = async (req, res, next) => {
    var deputado = req.body.deputado;
    var resultado = req.body.resultado;
    var username = resultado;

    for (let social of deputado.redeSocial) {
        if (social.includes('twitter')) {
            let segments = social.split('/');

            username = segments.pop() || segments.pop();  // handle potential trailing slash
        }
    }

    var cliente = new Twitter({
        consumer_key: 'j2N9QGbTWhs7GHUnxXHjl2P8Y',
        consumer_secret: 'JG48xVVOL7TT4DS1e85uxlsw7nVlmViZa4Uo0BXMf9nmPXWxxi',
        access_token_key: '964581524489175040-5bpLA9NL3Q2lVBeTrGXYPbNPRu10ZXq',
        access_token_secret: 'lgQ6XkndsqPcjhPJGG3h2cjuEIwxGSFDmYTJ5UwOdmcxw'
    });

    var nome = username ? '@' + username : deputado.nome;
    nome += ' (' + deputado.siglaPartido + '-' + deputado.siglaUf + ')';
    var hashtag = resultado.porcentagem >= 90 ? '#representa' : resultado.porcentagem < 50 ? '#naorepresenta' : '';
    var msg = 'O(a) deputado(a) ' + nome + ' foi analisado(a) por mais um cidadão através do SMB e a representatividade foi de ' + resultado.porcentagem + '%. ' + hashtag;

    cliente.post('statuses/update', {status: msg},  function(error, tweet, response) {
        if(error) throw error;
        // console.log(tweet);
    });

    res.status(200).send(true);
};

module.exports = { set };
