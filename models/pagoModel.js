import db from './database/conexion.js'

export class PagoModel {

  static async crear({ reserva_id, monto, fecha_pago, metodo_pago }) {    
    const [result] = await db.query(
      `INSERT INTO Pago (reserva_id, monto, fecha_pago, metodo_pago) VALUES (?, ?, ?, ?);`,
      [reserva_id, monto, fecha_pago, metodo_pago]
    )
    return result.insertId
  }

  static async consultarTodos() {
    const [pagos] = await db.query(
      `SELECT * FROM Pago;`
    )
    if (pagos.length === 0) return null
    return pagos
  }

  static async consultarPorId({ id }) {
    const [pagos] = await db.query(
      `SELECT * FROM Pago WHERE pago_id =?;`, [id]
    )
    if (pagos.length === 0) return null
    return pagos[0]
  }

  static async actualizar({ id, reserva_id, monto, fecha_pago, metodo_pago }) {    
    const [result] = await db.query(
      `UPDATE Pago SET reserva_id =?, monto =?, fecha_pago =?, metodo_pago =? WHERE pago_id =?;`,
      [reserva_id, monto, fecha_pago, metodo_pago, id]
    )
    return result.insertId
  }

  static async eliminar({ id }) {
    const [result] = await db.query(
      `DELETE FROM Pago WHERE pago_id =?;`, [id]
    )
    return result.affectedRows
  }
}
