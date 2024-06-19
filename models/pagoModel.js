import db from "../controllers/database/conexion.js";

export class PagoModel {
  static async crear({ reserva_id, monto, fecha_pago, metodo_pago }) {
    try {
      const [result] = await db.query(
        `INSERT INTO Pago (reserva_id, monto, fecha_pago, metodo_pago) VALUES (?, ?, ?, ?);`,
        [reserva_id, monto, fecha_pago, metodo_pago]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error al insertar en la base de datos:", error);
      throw error; // Esto permitirá que el error sea capturado en el controlador
    }
  }

  static async consultarTodos() {
    const [pagos] = await db.query(`SELECT * FROM Pago;`);
    if (pagos.length === 0) return null;
    return pagos;
  }

  static async consultarPorId({ id }) {
    const [pagos] = await db.query(`SELECT * FROM Pago WHERE pago_id =?;`, [
      id,
    ]);
    if (pagos.length === 0) return null;
    return pagos[0];
  }

  static async actualizar({ id, reserva_id, monto, fecha_pago, metodo_pago }) {
    const [result] = await db.query(
      `UPDATE Pago SET reserva_id =?, monto =?, fecha_pago =?, metodo_pago =? WHERE pago_id =?;`,
      [reserva_id, monto, fecha_pago, metodo_pago, id]
    );
    return result.insertId;
  }

  static async eliminar({ id }) {
    const [result] = await db.query(`DELETE FROM Pago WHERE pago_id =?;`, [id]);
    return result.affectedRows;
  }
}
