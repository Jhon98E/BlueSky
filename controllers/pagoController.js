export class PagoController {
    constructor({ pagoModel }) {
      this.pagoModel = pagoModel
    }
  
    crearPago = async (req, res) => {
      const { reserva_id, monto, fecha_pago, metodo_pago } = req.body;
      if (!reserva_id || !monto || !fecha_pago || !metodo_pago) {
          return res.status(400).send({ message: "Todos los campos son obligatorios" });
      }
      try {
          const nuevoPagoId = await this.pagoModel.crear({ reserva_id, monto, fecha_pago, metodo_pago });
          res.status(201).send({
              message: "Pago Registrado",
              id: nuevoPagoId,
              reserva_id: reserva_id,
              monto: monto,
              fecha_pago: fecha_pago,
              metodo_pago: metodo_pago
          });
      } catch (error) {
          console.error("Error al crear el pago:", error);
          res.status(500).send({ message: "Error al registrar el Pago.", error: error.message });
      }
    };
  
    consultarTodos = async (req, res) => {
      const pagos = await this.pagoModel.consultarTodos()
      if (pagos) return res.json(pagos)
      res.status(400).send({ message: "No se encontro el Pago" })
    }
  
    consultarPorId = async (req, res) => {
      const { id } = req.params
      const pago = await this.pagoModel.consultarPorId({id})
      if (pago) return res.json(pago)
      res.status(400).send({ message: "No se encontro el Pago" })
    }
  
    actualizarPago = async (req, res) => {
      const { id } = req.params
      const { reserva_id, monto, fecha_pago, metodo_pago } = req.body
      if (!reserva_id || !monto || !fecha_pago || !metodo_pago) {
        return res.status(400).send({ message: "Todos los campos son obligatorios" })
      }
      try {
        await this.pagoModel.actualizar({ id, reserva_id, monto, fecha_pago, metodo_pago })
        res.status(202).send({ message: "Pago Actualizado" })
      } catch (error) {
        res.status(500).send({ message: "Error al actualizar el Pago" })
      }
    }
  
    eliminarPago = async (req, res) => {
      const { id } = req.params
      try {
        await this.pagoModel.eliminar({ id })
        res.status(202).send({ message: "Pago Eliminado" })
      } catch (error) {
        res.status(500).send({ message: "Error al eliminar el Pago" })
      }
    }
  }
  