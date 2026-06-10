
import { catchAsync } from "../utils/catchAsync.js";

export const getAll = catchAsync(async (req, res) => {
    return res.json({ message: "Obtener todos los usuarios" });
});
export const getByOne = (req, res) => {
    const { id } = req.params;
    return res.status(200).json({ message: `Obtener usuario con ID: ${id}` });
}
export const create = (req, res) => {
    const { name, email } = req.body;
    return res.status(201).json({ message: `Crear usuario con nombre: ${name} y email: ${email}` });
}
export const update = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    return res.status(200).json({ message: `Actualizar usuario con ID: ${id}, nuevo nombre: ${name} y nuevo email: ${email}` });
}
export const deleteUser = (req, res) => {
    const { id } = req.params;
    return res.status(200).json({ message: `Eliminar usuario con ID: ${id}` });
}

