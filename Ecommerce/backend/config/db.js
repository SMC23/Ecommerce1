
const mysql = require('mysql2');

let db;

try {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.warn("⚠️ No se pudo conectar a MySQL, funcionando solo con Supabase:", err.message);
    } else {
      console.log("✅ Conectado a MySQL");
    }
  });
} catch (err) {
  console.warn("⚠️ Error inicializando MySQL:", err.message);
  db = null;
}

module.exports = db;

