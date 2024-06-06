import { Router } from "express"
import { PagoController } from "../../controllers/pagoController.js"

export const crearPagoRouter = ({ pagoModel }) => {
  const pagoRouter = Router()
  const pagoController = new PagoController({ pagoModel })

  pagoRouter.post("/", pagoController.crearPago)
  pagoRouter.get("/", pagoController.consultarTodos)
  pagoRouter.route("/:id")
    .get(pagoController.consultarPorId)
    .put(pagoController.actualizarPago)
    .delete(pagoController.eliminarPago)

  return pagoRouter
}
