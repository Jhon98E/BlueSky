import db from './database/conexion.js'

export class RegistroModel {

  static async crear({ nombre, apellido, email, contrasenia }) {    
    const [result] = await db.query(
      `INSERT INTO Cliente (nombre, apellido, email, contrasenia) VALUES (?, ?, ?, ?);`,
      [nombre, apellido, email, contrasenia]
    )
    return result.insertId
  }

  static async consultarTodos() {
    const [clientes] = await db.query(
      `SELECT * FROM Cliente;`
    )
    if (clientes.length === 0) return null
    return clientes
  }

  static async consultarPorId({ id }) {
    const [clientes] = await db.query(
      `SELECT * FROM Cliente WHERE cliente_id = ?;`,
      [id]
    )
    if (clientes.length === 0) return null
    return clientes[0]
  }

  static async actualizar({ id, nombre, apellido, email, contrasenia }) {    
    const [result] = await db.query(
      `UPDATE Cliente SET nombre =?, apellido =?, email =?, contrasenia =? WHERE cliente_id =?;`,
      [nombre, apellido, email, contrasenia, id]
    )
    return result.insertId
  }

  static async eliminar({ id }) {
    const [result] = await db.query(
      `DELETE FROM Cliente WHERE cliente_id =?;`,
      [id]
    )
    return result.affectedRows
  }
}
