import db from "../controllers/database/conexion.js";

export class MetodoModel {
  static async crear({ nombre_metodo }) {
    const [result] = await db.query(
      `INSERT INTO MetodoPago (nombre_metodo) VALUES (?);`,
      [nombre_metodo]
    );
    return result.insertId;
  }

  static async consultarTodos() {
    const [metodos] = await db.query(`SELECT * FROM MetodoPago;`);
    if (metodos.length === 0) return null;
    return clientes;
  }

  static async consultarPorId({ id }) {
    const [metodos] = await db.query(
      `SELECT * FROM MetodoPago WHERE metodo_id = ?;`,
      [id]
    );
    if (metodos.length === 0) return null;
    return metodos[0];
  }

  static async actualizar({ id, nombre_metodo }) {
    const [result] = await db.query(
      `UPDATE MetodoPago SET nombre_metodo =? WHERE metodo_id =?;`,
      [nombre_metodo, id]
    );
    return result.insertId;
  }

  static async eliminar({ id }) {
    const [result] = await db.query(
      `DELETE FROM MetodoPago WHERE metodo_id =?;`,
      [id]
    );
    return result.affectedRows;
  }
}
