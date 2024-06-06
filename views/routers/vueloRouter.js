import { Router } from "express"
import { VueloController } from "../../controllers/vueloController.js"

export const crearVueloRouter = ({ vueloModel }) => {
  const vueloRouter = Router()
  const vueloController = new VueloController({ vueloModel })

  vueloRouter.post("/", vueloController.crearVuelo)
  vueloRouter.get("/", vueloController.consultarTodos)
  vueloRouter.route("/:id")
    .get(vueloController.consultarPorId)
    .put(vueloController.actualizarVuelo)
    .delete(vueloController.eliminarVuelo)

  return vueloRouter
}
