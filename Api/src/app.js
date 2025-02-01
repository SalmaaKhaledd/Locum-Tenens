import express from 'express';
const cors = require('cors');
const app = express();

//Middleware
app.use(cors()); //enable cors
app.use(express.json()); //parse json requests



module.exports = app;

