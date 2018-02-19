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

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// registra as rotas com o prefixo api
app.use('/api', routes());

// registra a rota /
app.get('/', function (req, res) {
    res.send('Welcome to SMB API');
});

app.listen(port);
