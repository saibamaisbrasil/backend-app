'use strict';

const express = require('express');
const routes = require('./app/routes');
const cors = require('cors');
const parser = require('body-parser');

const app = express();

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;

// configura CORS
app.use(cors());

app.use(parser.json()); // support json encoded bodies
app.use(parser.urlencoded({ extended: true })); // support encoded bodies

// registra as rotas com o prefixo api
app.use('/api', routes());

//registra a rota publica para servir arquivos estaticos
app.use('/public', express.static('public'));

// registra a rota / para o site do projeto
app.get('/', function (req, res) {
    res.send('Welcome to SMB API');
});

app.listen(port);
