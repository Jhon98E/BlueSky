import express, { json } from "express"
import cors from "cors"

import { crearClienteRouter } from "./views/routers/registroRouter.js"
import { crearVueloRouter } from "./views/routers/vueloRouter.js"
import { crearReservaRouter } from "./views/routers/reservaRouter.js"

import { RegistroModel } from "./models/registroModel.js"
import { VueloModel } from "./models/vueloModel.js"
import { ReservaModel } from "./models/reservaModel.js"

export const crearApp = ({ registroModel, vueloModel, reservaModel }) => {
  const app = express()
  app.disable("x-powered-by")
  app.use(cors())
  app.use(json())

  app.get("/", (req, res) => {
    res.send("Hello World!")
  })

  app.use("/registro", crearClienteRouter({ registroModel }))
  app.use("/vuelos", crearVueloRouter({ vueloModel }))
  app.use("/reservas", crearReservaRouter({ reservaModel }))

  // Correr Servidor
  const PORT = process.env.PORT ?? 3000
  app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto: http://127.0.0.1:${PORT}`)
  })
}

crearApp({
  registroModel: RegistroModel,
  vueloModel: VueloModel,
  reservaModel: ReservaModel
})