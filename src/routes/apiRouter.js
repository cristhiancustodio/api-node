import axios, { Axios } from "axios";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { authenticate } from "../middleware/authenticate.js";

const apiRouter = Router();


apiRouter.get("/generate-token", (req, res) => {
    try {

        const JWT_SECRET = process.env.JWT_SECRET;

        const payload = {
            // Datos que quieres codificar en el token
            sub: "user_id_aqui",
            role: "admin",
            iat: Math.floor(Date.now() / 1000),
        };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1h", // "7d", "30m", etc.
        });

        return res.status(200).json({ access_token: token, token_type: "Bearer" });
    } catch (error) {
        return res.status(500).json({ error: "Error al generar el token", message: error.message });
    }
});



// TODO LOS QUE VAYAN DESPUES DE ESTA LINEA TENDRAN VALIDACION DE AUTENTICACION
apiRouter.use(authenticate);


apiRouter.post("/", async (req, res) => {
    try {
        const response = req.body;
        const bearer = req.headers.authorization;

        const token = bearer.split(" ")[1]; // Extraer el token del encabezado Authorization


        const { data } = await axios.post(process.env.API_GO, {
            matrix: response.matrix,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        //flat desepaqueto todo en una sola lista
        const valorMaximo = Math.max(...data.original.flat());
        const valorMinimo = Math.min(...data.original.flat());
        const sumaTotal = data.original.flat().reduce((acc, val) => acc + val, 0);
        const promedio = sumaTotal / data.original.flat().length;


        const isDiagonal = (matrix) => {
            // Primero verificar que sea cuadrada
            const rows = matrix.length;
            const cols = matrix[0].length;

            if (rows !== cols) return false;

            // Verificar que todos los elementos fuera de la diagonal sean 0
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (i !== j && matrix[i][j] !== 0) {
                        return false;
                    }
                }
            }
            return true;
        };


        return res.status(200).json({
            error: false,
            message: "API Node corriendo correctamente",
            data: data,
            calculos: {
                valorMaximo: valorMaximo,
                valorMinimo: valorMinimo,
                promedio: promedio,
                sumaTotal: sumaTotal,
                matrizDiagonal: isDiagonal(data.original)
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Error interno del servidor",
            data: error.message
        })
    }
});




export default apiRouter;