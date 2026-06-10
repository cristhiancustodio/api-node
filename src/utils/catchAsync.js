// Envuelve cualquier función async y pasa el error a next()
// Sin esto, un throw/reject dentro de async NO llega al error handler de Express
export const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};