export class MetodoController {
    constructor({ metodoModel }) {
      this.metodoModel = metodoModel
    }
  
    crearMetodo = async (req, res) => {
      const { nombre_metodo } = req.body
      if (!nombre_metodo) {
        return res.status(400).send({ message: "El campo es obligatorio" })
      }
      try {
        const nuevoMetodoId = await this.metodoModel.crear({ nombre_metodo })
        res.status(201).send({ message: "Ciente Registrado", id: nuevoMetodoId, nombre_metodo: nombre_metodo})
      } catch (error) {
        res.status(500).send({ message: "Error al crear el Metodo de Pago" })
      }
    }
  
    consultarTodos = async (req, res) => {
      const Metodos = await this.metodoModel.consultarTodos()
      if (Metodos) return res.json(Metodos)
      res.status(400).send({ message: "No se encontro el Metodo de Pago" })
    }
  
    consultarPorId = async (req, res) => {
      const { id } = req.params
      const metodo = await this.metodoModel.consultarPorId({id})
      if (metodo) return res.json(metodo)
      res.status(400).send({ message: "No se encontro el Metodo de Pago" })
    }

    consultarPorNombre = async (req, res) => {
      const { nombre } = req.query;
      const metodoPago = await this.metodoModel.consultarPorNombre({ nombre });
      if (metodoPago) return res.json(metodoPago);
      res.status(400).send({ message: "Método de pago no encontrado" });
    };
  
    actualizarMetodo = async (req, res) => {
      const { id } = req.params
      const { nombre_metodo } = req.body
      if (!nombre_metodo) {
        return res.status(400).send({ message: "El campo es obligatorio" })
      }
      try {
        await this.metodoModel.actualizar({ id, nombre_metodo })
        res.status(202).send({ message: "Metodo de Pago Actualizado" })
      } catch (error) {
        res.status(500).send({ message: "Error al actualizar el Metodo de Pago" })
      }
    }
  
    eliminarMetodo = async (req, res) => {
      const { id } = req.params
      try {
        await this.metodoModel.eliminar({ id })
        res.status(202).send({ message: "Metodo de Pago Eliminado" })
      } catch (error) {
        res.status(500).send({ message: "Error al eliminar el Metodo de Pago" })
      }
    }
  }
  