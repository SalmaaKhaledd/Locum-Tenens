import express from 'express';
import cors from 'cors';
import e from 'express';
import authRoutes from './routes/authRoutes.js';
import shiftRoutes from './routes/shiftRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';


//Handles the Express app setup (middleware, CORS, JSON parsing).

const app = express();

//Middleware
app.use(cors()); //enable cors
app.use(express.json()); //parse json requests
app.use(cookieParser()); //parse cookies

app.use('/api/auth', authRoutes);
app.use('/api/shift', shiftRoutes);
app.use('/api/uses', userRoutes);
app.use('/api/application', applicationRoutes);

export default app; 

