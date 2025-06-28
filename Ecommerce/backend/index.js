const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 3001

app.use(cors())
app.use(express.json()) // para leer JSON


require('dotenv').config()
// Conexión con MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,  // Cambia si tu usuario no es root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})




db.connect((err) => {
  if (err) throw err
  console.log('✅ Conectado a MySQL')
})

// Ruta para guardar un producto
app.post('/productos', (req, res) => {
  const { nombre, precio , imagen, descripcion } = req.body
  const sql = 'INSERT INTO productos (nombre, precio, imagen, descripcion) VALUES (?, ?, ?, ?)'
  db.query(sql, [nombre, precio, imagen, descripcion], (err, result) => {
    if (err) return res.status(500).json({ error: err })
    res.status(201).json({ message: 'Producto guardado', id: result.insertId })
  })
})

// Ruta para ver todos los productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json({ error: err })
    res.status(200).json(results)
  })
})

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`)
})















