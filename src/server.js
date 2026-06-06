import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import apiRouter from './routes/apiRouter.js';
import { corsConfig } from './cors.js';

dotenv.config()

const app = express();
app.use(cors(corsConfig)); //Para comunicarme con el frontend
app.use(morgan('combined')); //Registro de solicitudes HTTP solo para desarrollo
app.use(helmet()); //Agregmos headers de seguridad HTTP
app.use(express.json({ limit: '1mb' }));


app.use("/api/v1", apiRouter);

export default app;
