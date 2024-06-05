export class VueloController {
    constructor({ vueloModel }) {
      this.vueloModel = vueloModel
    }
  
    crearVuelo = async (req, res) => {
      const { origen, destino, fecha_salida, fecha_regreso, precio, tipo_vuelo } = req.body
      if (!origen || !destino || !fecha_salida || !precio || !tipo_vuelo) {
        return res.status(400).send({ message: "Todos los campos son obligatorios excepto fecha de regreso" })
      }
      try {
        const nuevoVueloId = await this.vueloModel.crear({
            origen, destino, fecha_salida, fecha_regreso, precio, tipo_vuelo
        })
        res.status(201).send({
            message: "Vuelo Registrado", 
            id:nuevoVueloId, 
            origen:origen, 
            destino:destino, 
            fecha_salida:fecha_salida, 
            fecha_regreso:fecha_regreso,
            precio:precio,
            tipo_vuelo:tipo_vuelo
        })
      } catch (error) {
        console.error("Error al crear el vuelo:", error)
        res.status(500).send({ message: "Error al crear el Vuelo" })
      }
    }
  
    consultarTodos = async (req, res) => {
      const vuelos = await this.vueloModel.consultarTodos()
      if (vuelos) return res.json(vuelos)
      res.status(400).send({ message: "No se encontro el Vuelo" })
    }
  
    consultarPorId = async (req, res) => {
      const { id } = req.params
      const vuelo = await this.vueloModel.consultarPorId({id})
      if (vuelo) return res.json(vuelo)
      res.status(400).send({ message: "No se encontro el Vuelo" })
    }
  
    actualizarVuelo = async (req, res) => {
      const { id } = req.params
      const { origen, destino, fecha_salida, fecha_regreso, precio, tipo_vuelo } = req.body
      if (!origen || !destino || !fecha_salida || !precio || !tipo_vuelo) {
        return res.status(400).send({ message: "Todos los campos son obligatorios excepto fecha de regreso" })
      }
      try {
        await this.vueloModel.actualizar({ id, origen, destino, fecha_salida, fecha_regreso, precio, tipo_vuelo })
        res.status(202).send({ message: "Vuelo Actualizado" })
      } catch (error) {
        res.status(500).send({ message: "Error al actualizar el Vuelo" })
      }
    }
  
    eliminarVuelo = async (req, res) => {
      const { id } = req.params
      try {
        await this.vueloModel.eliminar({ id })
        res.status(202).send({ message: "Vuelo Eliminado" })
      } catch (error) {
        res.status(500).send({ message: "Error al eliminar el Vuelo" })
      }
    }
  }
  