import express from 'express';
import cors from 'cors';
import e from 'express';
const app = express();

//Middleware
app.use(cors()); //enable cors
app.use(express.json()); //parse json requests


export default app; 

