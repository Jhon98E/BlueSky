import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'bluesky'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const createConnection = async () => {
  try {
    const db = await mysql.createConnection(connectionString);
    console.log("Conexión a la base de datos exitosa");
    return db;
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    throw error;
  }
}

const db = await createConnection()

export default db