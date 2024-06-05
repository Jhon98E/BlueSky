export class ReservaController {
    constructor({ reservaModel }) {
      this.reservaModel = reservaModel
    }
  
    crearReserva = async (req, res) => {
      const { cliente_id, vuelo_id, fecha_reserva, estado } = req.body
      if (!cliente_id || !vuelo_id || !fecha_reserva || !estado) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" })
      }
      try {
        const nuevaReservaId = await this.reservaModel.crear({
            cliente_id, vuelo_id, fecha_reserva, estado
        })
        res.status(201).send({
            message: "Reserva Registrada", 
            id:nuevaReservaId, 
            cliente_id:cliente_id, 
            vuelo_id:vuelo_id, 
            fecha_reserva:fecha_reserva, 
            estado:estado
        })
      } catch (error) {
        res.status(500).send({ message: "Error al crear la Reserva" })
      }
    }
  
    consultarTodos = async (req, res) => {
      const reservas = await this.reservaModel.consultarTodos()
      if (reservas) return res.json(reservas)
      res.status(400).send({ message: "No se encontro ninguna Reserva" })
    }
  
    consultarPorId = async (req, res) => {
      const { id } = req.params
      const reserva = await this.reservaModel.consultarPorId({id})
      if (reserva) return res.json(reserva)
      res.status(400).send({ message: "No se encontro la Reserva" })
    }
  
    actualizarReserva = async (req, res) => {
      const { id } = req.params
      const { cliente_id, vuelo_id, fecha_reserva, estado } = req.body
      if (!cliente_id || !vuelo_id || !fecha_reserva || !estado) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" })
      }
      try {
        await this.reservaModel.actualizar({ id, cliente_id, vuelo_id, fecha_reserva, estado })
        res.status(202).send({ message: "Reserva Actualizada" })
      } catch (error) {
        res.status(500).send({ message: "Error al actualizar la Reserva" })
      }
    }
  
    eliminarReserva = async (req, res) => {
      const { id } = req.params
      try {
        await this.reservaModel.eliminar({ id })
        res.status(202).send({ message: "Reserva Eliminada" })
      } catch (error) {
        res.status(500).send({ message: "Error al eliminar la Reserva" })
      }
    }
  }
  