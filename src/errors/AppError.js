// Error personalizado para errores operacionales (esperados)
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // lo usamos en el error handler para distinguirlo de bugs
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;