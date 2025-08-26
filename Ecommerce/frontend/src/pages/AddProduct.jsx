import { useState } from 'react'
import axios from 'axios'

const AddProduct = () => {
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [imagen, setImagen] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!nombre || !precio || !imagen) {
            setMessage('❌ Todos los campos son obligatorios')
            return
        }
        const precioNumero = parseFloat(precio)
        if (isNaN(precioNumero) || precioNumero <= 0) {
            setMessage('❌ El precio debe ser un número mayor que cero')
            return
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post('http://localhost:3001/productos', {
                nombre,
                precio: precioNumero,
                imagen,
                descripcion
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setMessage('✅ Producto guardado con éxito')
            setNombre('')
            setPrecio('')
            setImagen('')
            setDescripcion('')
        } catch (error) {
            console.log('Error al guardar el produto', error)
            setMessage('❌ Error al guardar el producto')
        }
    }
    return (
        <div>
            <h2>Agregar un nuevo produto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Nombre del producto'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder='Precio'
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />

                <input
                    type="text"
                    placeholder='URL de imagen'
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='descripcion del produto'
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <button type='submit'>Guardar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default AddProduct