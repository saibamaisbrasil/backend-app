'use strict';

const mongoose = require('mongoose');

// const uri = 'mongodb://ds153179.mlab.com:53179';
// const options = { user: 'smb_user', pass: 'semsenha', useMongoClient: true };

mongoose.Promise = global.Promise;

// mongoose.connect(uri, options);
mongoose.connect('mongodb://smb_user:semsenha@ds153179.mlab.com:53179/smb', { useMongoClient: true });

module.exports = { mongoose };
