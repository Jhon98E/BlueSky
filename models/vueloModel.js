import db from "../controllers/database/conexion.js";

export class VueloModel {
  static async crear({
    origen,
    destino,
    fecha_salida,
    fecha_regreso,
    precio,
    tipo_vuelo,
  }) {
    const fechaRegresoValue = fecha_regreso ? fecha_regreso : null;
    const [result] = await db.query(
      `INSERT INTO Vuelo (origen, destino, fecha_salida, fecha_regreso, precio, tipo_vuelo) VALUES (?, ?, ?, ?, ?, ?);`,
      [origen, destino, fecha_salida, fechaRegresoValue, precio, tipo_vuelo]
    );
    return result.insertId;
  }

  static async consultarTodos() {
    const [vuelos] = await db.query(`SELECT * FROM Vuelo;`);
    if (vuelos.length === 0) return null;
    return vuelos;
  }

  static async consultarPorId({ id }) {
    const [vuelos] = await db.query(`SELECT * FROM Vuelo WHERE vuelo_id = ?;`, [
      id,
    ]);
    if (vuelos.length === 0) return null;
    return vuelos[0];
  }

  static async actualizar({
    id,
    origen,
    destino,
    fecha_salida,
    fecha_regreso,
    precio,
    tipo_vuelo,
  }) {
    const [result] = await db.query(
      `UPDATE Vuelo SET origen =?, destino =?, fecha_salida =?, fecha_regreso =?, precio =?, tipo_vuelo =? WHERE vuelo_id =?;`,
      [origen, destino, fecha_salida, fecha_regreso, precio, tipo_vuelo, id]
    );
    return result.affectedRows;
  }

  static async eliminar({ id }) {
    const [result] = await db.query(`DELETE FROM Vuelo WHERE vuelo_id =?;`, [
      id,
    ]);
    return result.affectedRows;
  }
}
