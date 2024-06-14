import db from "../controllers/database/conexion.js";

export class ReservaModel {
  static async crear({ cliente_id, vuelo_id, fecha_reserva, estado }) {
    const [result] = await db.query(
      `INSERT INTO Reserva (cliente_id, vuelo_id, fecha_reserva, estado) VALUES (?, ?, ?, ?);`,
      [cliente_id, vuelo_id, fecha_reserva, estado]
    );
    return result.insertId;
  }

  static async consultarTodos() {
    const [reservas] = await db.query(`SELECT * FROM Reserva;`);
    if (reservas.length === 0) return null;
    return reservas;
  }

  static async consultarPorId({ id }) {
    const [reservas] = await db.query(
      `SELECT * FROM Reserva WHERE reserva_id = ?;`,
      [id]
    );
    if (reservas.length === 0) return null;
    return reservas[0];
  }

  static async actualizar({ id, cliente_id, vuelo_id, fecha_reserva, estado }) {
    const [result] = await db.query(
      `UPDATE Reserva SET cliente_id =?, vuelo_id =?, fecha_reserva =?, estado =? WHERE reserva_id =?;`,
      [cliente_id, vuelo_id, fecha_reserva, estado, id]
    );
    return result.affectedRows;
  }

  static async eliminar({ id }) {
    const [result] = await db.query(
      `DELETE FROM Reserva WHERE reserva_id =?;`,
      [id]
    );
    return result.affectedRows;
  }
}
