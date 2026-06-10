import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import apiRouter from './routes/apiRouter.js';
import { corsConfig } from './cors.js';
import apiUsuariosRouter from './routes/apiUsuarios.js'
import AppError from './errors/AppError.js'

dotenv.config()

const app = express();
app.use(helmet()); //Agregmos headers de seguridad HTTP
app.use(cors(corsConfig)); //Para comunicarme con el frontend
app.use(morgan('combined')); //Registro de solicitudes HTTP solo para desarrollo
app.use(express.json({ limit: '1mb' }));


app.use("/api/v1", apiRouter);
app.use("/api/v2", apiUsuariosRouter);

/*app.all('*', (req, res, next) => {
    next(new AppError(`Ruta ${req.originalUrl} no encontrada`, 404));
});*/
export default app;
