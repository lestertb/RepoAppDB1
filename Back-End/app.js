//Dependencias=========================================
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// ====================================================
if (!process.env.SECRET) process.env.SECRET = 'supersecret';
// ====================================================

//Morgan (desconocido)=================================
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Middleware===========================================



//CORS - Mejorar middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

//Constantes que llaman a las rutas para ser corridas por el app.js
const cliente= require('./routes/route.cliente');
app.use('/cliente', cliente);

const centroCosto= require('./routes/route.centroCosto');
app.use('/centroCosto', centroCosto);

const cobroXKilometraje= require('./routes/route.cobroXKilometraje');
app.use('/cobroXKilometraje', cobroXKilometraje);

const colaborador = require('./routes/route.colaborador');
app.use('/colaborador', colaborador);

const eventos = require('./routes/route.eventos');
app.use('/eventos', eventos);

const labor = require('./routes/route.labor');
app.use('/labor', labor);

const motivo = require('./routes/route.motivo');
app.use('/motivo', motivo);

const sucursal = require('./routes/route.sucursal');
app.use('/sucursal', sucursal);

const tipoLabor = require('./routes/route.tipoLabor');
app.use('/tipoLabor', tipoLabor);

const tipoSoporte = require('./routes/route.tipoSoporte');
app.use('/tipoSoporte', tipoSoporte);

const tipoViatico= require('./routes/route.tipoViatico');
app.use('/tipoViatico', tipoViatico);

const vehiculo= require('./routes/route.vehiculo');
app.use('/vehiculo', vehiculo);

const viatico= require('./routes/route.viatico');
app.use('/viatico', viatico);


//NOT FOUND
app.use((req, res) => {
  res.sendStatus(404);
});

//ERROR
app.use((err, req, res) => {
  res.status(err.status || 500)
  .json({error:{message: err.message}});
});

module.exports = app;
