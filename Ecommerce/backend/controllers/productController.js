const db = require('../config/db')

// Mostrar todos los productos
exports.getProductos = (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json({ error: err })
    res.status(200).json(results)
  })
}

// Agregar producto
exports.createProducto = (req, res) => {
  const { nombre, precio, imagen, descripcion } = req.body
  const sql = 'INSERT INTO productos (nombre, precio, imagen, descripcion) VALUES (?, ?, ?, ?)'
  db.query(sql, [nombre, precio, imagen, descripcion], (err, result) => {
    if (err) return res.status(500).json({ error: err })
    res.status(201).json({ message: 'Producto guardado', id: result.insertId })
  })
}

// Eliminar producto
exports.deleteProducto = (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM productos WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err })
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.status(200).json({ message: 'Producto borrado' })
  })
}
