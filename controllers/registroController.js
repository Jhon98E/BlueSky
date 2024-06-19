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
      res.status(201).send({ message: "Cliente Registrado", id: nuevoClienteId, nombre, apellido })
    } catch (error) {
      res.status(500).send({ message: "Error al crear el cliente" })
    }
  }

  iniciarSesion = async (req, res) => {
    const { email, contrasenia } = req.body

    if (!email || !contrasenia) {
      return res.status(400).send({ message: "Todos los campos son obligatorios" })
    }
    try {
      const cliente = await this.registroModel.consultarPorEmail(email)

      if (!cliente || cliente.contrasenia !== contrasenia) {
        return res.status(401).send({ message: "Correo o contraseña incorrectos" })
      }
      res.status(200).send({ message: "Inicio de sesión exitoso", cliente_id: cliente.cliente_id })
    } catch (error) {
      res.status(500).send({ message: "Error al iniciar sesión" })
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
