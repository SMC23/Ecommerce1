import axios from 'axios'
import { useEffect, useState } from 'react'

const DeleteProduct = () => {
  const [productos, setProductos] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const obtenerProductos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/productos').then(response => (setProductos(response.data)))
    } catch (error) {
      console.error('Error al obtner los datos', error)
    }
  }
  const eliminarProductos = async (id) => {
    const confirmar = window.confirm('Estas seguro de eliminar esto')
    if (!confirmar) return alert('Miedoso perro')
    try {
      const token = localStorage.getItem("token")
      const res = await axios.delete(`http://localhost:3001/productos/${id}`,
        {
        headers: {
          Authorization: `Bearer ${token}` // 👈 enviar token
        }
      }
      )
      alert(res.data.message)
      setProductoSeleccionado(null)
      obtenerProductos()
    } catch (error) {
      console.error('No se pudo eliminar', error)
      alert('No se pudo elimnar perro')
    }
  }
  useEffect(() => {
    obtenerProductos()
  }, [])
  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4' >Lista de Productos </h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <ul className='space-y-4'>
          {productos.map((producto) => (
            <li key={producto.id} className='border p-4 rounded shadow flex justify justify-between items-center'>
              <div>
                <strong>{producto.nombre}</strong> -${producto.precio}
              </div>
              <button className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                onClick={() => setProductoSeleccionado(producto)}> Ver producto
              </button>
            </li>
          ))}
        </ul>
      )}
      {/*Detalle del procduto seleccionado*/}
      {productoSeleccionado && (
        <div className='mt-6 p-4 border rounded bg-gray-100'>
          <h3 className='text-xl font-semibold mb-2'>Detalles del producto</h3>
          <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
          <p><strong>Precio:</strong> ${productoSeleccionado.precio}</p>
          <p><strong>Descripcion:</strong> ${productoSeleccionado.descripcion}</p>
          {productoSeleccionado.imagen && (
            <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} className='w-40 mt-2 rounded' />
          )}
          <div className='mt-4 space-x-2'>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => eliminarProductos(productoSeleccionado.id)}
            >
              Eliminar
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setProductoSeleccionado(null)}
            >
              Cancelar
            </button>
          </div>
        </div>

      )}
    </div>
  )
}

export default DeleteProduct