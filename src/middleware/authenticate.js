import jwt from "jsonwebtoken";


export const authenticate = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(401).json({ error: "No autorizado. Token requerido." });
    }
    const [, token] = bearer.split(" ");
    if (!token) {
        return res.status(401).json({ error: "No autorizado. Token inválido." });
    }
    return jwt.verify(
        token,
        JWT_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "No autorizado. Token inválido." });
            }
            req.user = decoded; // Puedes almacenar la información del usuario decodificada en req.user
            next();
        }
    )

}