import { Router } from "express"
import { MetodoController } from "../../controllers/metodoController.js"

export const crearMetodoRouter = ({ metodoModel }) => {
  const metodoRouter = Router()
  const metodoController = new MetodoController({ metodoModel })

  metodoRouter.post("/", metodoController.crearMetodo)
  metodoRouter.get("/", metodoController.consultarTodos)
  metodoRouter.route("/:id")
    .get(metodoController.consultarPorId)
    .put(metodoController.actualizarMetodo)
    .delete(metodoController.eliminarMetodo)

  return metodoRouter
}
