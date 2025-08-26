const express = require('express')
const cors = require('cors')
require('dotenv').config()
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express()
const port = process.env.PORT || 3001

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
const productRoutes = require('./routes/productRoutes,js')
app.use('/productos', productRoutes)
app.use('/usuarios', userRoutes)

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`)
})







