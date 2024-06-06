import express, { json } from "express"
import cors from "cors"

import { crearClienteRouter } from "./views/routers/registroRouter.js"
import { crearVueloRouter } from "./views/routers/vueloRouter.js"
import { crearReservaRouter } from "./views/routers/reservaRouter.js"
import { crearMetodoRouter } from "./views/routers/metodoRouter.js"
import { crearPagoRouter } from "./views/routers/pagoRouter.js"

import { RegistroModel } from "./models/registroModel.js"
import { VueloModel } from "./models/vueloModel.js"
import { ReservaModel } from "./models/reservaModel.js"
import { MetodoModel } from "./models/metodoModel.js"
import { PagoModel } from "./models/pagoModel.js"

export const crearApp = ({ registroModel, vueloModel, reservaModel, metodoModel, pagoModel }) => {
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
  app.use("/metodo-de-pago", crearMetodoRouter({ metodoModel }))
  app.use("/pagos", crearPagoRouter({ pagoModel }))

  // Correr Servidor
  const PORT = process.env.PORT ?? 3000
  app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto: http://127.0.0.1:${PORT}`)
  })
}

crearApp({
  registroModel: RegistroModel,
  vueloModel: VueloModel,
  reservaModel: ReservaModel,
  metodoModel: MetodoModel,
  pagoModel: PagoModel,
})
