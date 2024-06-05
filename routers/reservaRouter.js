import { Router } from "express"
import { ReservaController } from "../controllers/reservaController.js"

export const crearReservaRouter = ({ reservaModel }) => {
  const reservaRouter = Router()
  const reservaController = new ReservaController({ reservaModel })

  reservaRouter.post("/", reservaController.crearReserva)
  reservaRouter.get("/", reservaController.consultarTodos)
  reservaRouter.route("/:id")
    .get(reservaController.consultarPorId)
    .put(reservaController.actualizarReserva)
    .delete(reservaController.eliminarReserva)

  return reservaRouter
}
