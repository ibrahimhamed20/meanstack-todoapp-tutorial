//Bring in all dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodayParser = require('body-parser');

//Intiailzie app with express
const app = express();

const UserRoutes = require('./routes/users');

//Database Connection
mongoose.Promise = global.Promise; // Fix Deprecation issue
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});
mongoose.connection.on('error',  (err) => {
  console.log(`Unable to connect to the database: ${err}`);
});

//Port to be used by the server
const _PORT = process.env.PORT;

//---------------- Middlewares ----------------//
app.use(bodayParser.json());

//---------------- Middlewares ----------------//

//Index Rotuer
app.get('/', (req, res, next) => {
  res.send('I am alive')
});

//Users Routes
app.use('/users', UserRoutes);

//Start the server
app.listen(_PORT, () => {
  console.log('Server Started');
});
