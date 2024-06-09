import { Router } from "express"
import { RegistroController } from "../../controllers/registroController.js"

export const crearClienteRouter = ({ registroModel }) => {
  const registroRouter = Router()
  const registroController = new RegistroController({ registroModel })

  registroRouter.post("/", registroController.crearCliente)
  registroRouter.post("/iniciar-sesion", registroController.iniciarSesion)
  registroRouter.get("/", registroController.consultarTodos)
  registroRouter.route("/:id")
    .get(registroController.consultarPorId)
    .put(registroController.actualizarCliente)
    .delete(registroController.eliminarCliente)

  return registroRouter
}
