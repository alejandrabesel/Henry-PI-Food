const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); //parecido a lo que haciamos con express.json
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}); //esto es para el cors, ya configurado tmb

server.use('/', routes); // aca arranco a armar mi routeo -> mis routes van a estar en mi carpeta routes (separadas en carpetas (ej: fulanitoRouter.js)); fulanitoRouter va a ser exportado y va a ser recibido por el index de los routers !! y ese index es el que va a ser usado por este server.use (routes es el index)

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
