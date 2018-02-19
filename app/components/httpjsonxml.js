// 'use strict';
//
// const http = require('http');
// const https = require('https');
// const parser = require('xml2js');
//
// const httpjson = function(url, callback) {
//     http.get(url, function(res) {
//         var data = '';
//
//         // A chunk of data has been recieved.
//         res.on('data', function(chunk) {
//             data += chunk;
//         });
//
//         // The whole response has been received. Print out the result.
//         res.on('end', function() {
//             callback(data);
//         });
//     });
// };
//
// const httpsjson = function(url, callback) {
//     https.get(url, function(res) {
//         var data = '';
//
//         // A chunk of data has been recieved.
//         res.on('data', function(chunk) {
//             data += chunk;
//         });
//
//         // The whole response has been received. Print out the result.
//         res.on('end', function() {
//             callback(data);
//         });
//     });
// };
//
// const httpxml = function(url, callback) {
//     http.get(url, function(res) {
//         var data = '';
//
//         // A chunk of data has been recieved.
//         res.on('data', function(chunk) {
//             data += chunk;
//         });
//
//         // The whole response has been received. Print out the result.
//         res.on('end', function() {
//             parser.parseString(data, function (err, result) {
//                 callback(result);
//             });
//         });
//     });
// };
//
// const httpsxml = function(url, callback) {
//     https.get(url, function(res) {
//         var data = '';
//
//         // A chunk of data has been recieved.
//         res.on('data', function(chunk) {
//             data += chunk;
//         });
//
//         // The whole response has been received. Print out the result.
//         res.on('end', function() {
//             parser.parseString(data, function (err, result) {
//                 callback(result);
//             });
//         });
//     });
// };
//
// module.exports = { httpjson, httpsjson, httpxml, httpsxml };
