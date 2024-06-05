export class RegistroController {
  constructor({ registroModel }) {
    this.registroModel = registroModel
  }

  crearCliente = async (req, res) => {
    const { nombre, apellido, email, contrasenia } = req.body
    if (!nombre || !apellido || !email || !contrasenia) {
      return res.status(400).send({ message: "Todos los campos son obligatorios" })
    }
    try {
      const nuevoClienteId = await this.registroModel.crear({ nombre, apellido, email, contrasenia })
      res.status(201).send({ message: "Ciente Registrado", id: nuevoClienteId, nombre: nombre, apellido: apellido})
    } catch (error) {
      res.status(500).send({ message: "Error al crear el cliente" })
    }
  }

  consultarTodos = async (req, res) => {
    const clientes = await this.registroModel.consultarTodos()
    if (clientes) return res.json(clientes)
    res.status(400).send({ message: "No se encontro el cliente" })
  }

  consultarPorId = async (req, res) => {
    const { id } = req.params
    const cliente = await this.registroModel.consultarPorId({id})
    if (cliente) return res.json(cliente)
    res.status(400).send({ message: "No se encontro el cliente" })
  }

  actualizarCliente = async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, email, contrasenia } = req.body
    if (!nombre ||!apellido ||!email ||!contrasenia) {
      return res.status(400).send({ message: "Todos los campos son obligatorios" })
    }
    try {
      await this.registroModel.actualizar({ id, nombre, apellido, email, contrasenia })
      res.status(202).send({ message: "Cliente Actualizado" })
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar el cliente" })
    }
  }

  eliminarCliente = async (req, res) => {
    const { id } = req.params
    try {
      await this.registroModel.eliminar({ id })
      res.status(202).send({ message: "Cliente Eliminado" })
    } catch (error) {
      res.status(500).send({ message: "Error al eliminar el cliente" })
    }
  }
}
