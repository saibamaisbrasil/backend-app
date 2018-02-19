'use strict';

const express = require('express');
const routes = require('./app/routes');
const cors = require('cors');
const parser = require('body-parser');

const app = express();
const port = 3000;

// configura CORS
app.use(cors({origin: '*'}));

app.use(parser.json()); // support json encoded bodies
app.use(parser.urlencoded({ extended: true })); // support encoded bodies

// registra as rotas com o prefixo api
app.use('/api', routes());

// registra a rota /
app.get('/', function (req, res) {
    res.send('Welcome to SMB API');
});

app.listen(port);
