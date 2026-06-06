//Le aplico CORS para que el frontend pueda comunicarse con el backend sin problemas de seguridad

export const corsConfig = {
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL]

        // Permitir peticiones sin Origin (Postman, curl, servidores sin encabezado Origin)
        if (!origin) {
            return callback(null, true)
        }
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']

}