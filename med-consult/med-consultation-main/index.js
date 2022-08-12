var express = require('express');
var admin = require('firebase-admin');
var firebase = require('firebase');
var http =require('http');
var app = express();
const cors = require('cors');

var serviceAccount = require('./firebase-admin-creds.json');
const server = http.Server(app);
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json())
app.use(cors({ origin: true }));


app.post('/signup',require('./src/controllers/login.controller').signup);
app.post('/login',require('./src/controllers/login.controller').login);
app.post('/logout',require('./src/controllers/login.controller').logout);
app.post('/authenticate',require('./src/controllers/login.controller').authenticate);
app.get('/getAllAccountRequests',require('./src/controllers/admin.controller').getAllAccountRequests);
app.post('/acceptAccountRequest',require('./src/controllers/admin.controller').acceptAccountRequest);
app.get('/getAllDoctors',require('./src/controllers/patient.controller').getAllDoctors);
app.get('/getAllPatients',require('./src/controllers/patient.controller').getAllPatients);
app.get('/getAllAdmins',require('./src/controllers/patient.controller').getAllAdmins);
server.listen(3000, function () {
  admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
	firebase.initializeApp(require('./src/models/db').firebaseConfig);
  console.log('listening on port http://127.0.0.1:3000 !');
});

module.exports = {
  app,
};