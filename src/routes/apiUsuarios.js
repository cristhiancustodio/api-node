import { Router } from "express";
import { create, deleteUser, getAll, getByOne, update } from "../controller/UsuarioController.js";
import { authenticate } from "../middleware/authenticate.js";



const apiUsuariosRouter = Router();

apiUsuariosRouter.route("/")
    .get(authenticate, getAll)
    .post(create)


apiUsuariosRouter.route("/:id")
    .get(getByOne)
    .put(update)
    .delete(deleteUser)

export default apiUsuariosRouter;