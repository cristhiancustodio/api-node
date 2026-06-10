const errorHandler = (err, req, res, next) => {
    // Errores operacionales vs errores de programación
    const status = err.status || err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Internal Server Error';

    res.status(status).json({
        status: 'error',
        message,
        // Solo en dev mostramos el stack
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default errorHandler;