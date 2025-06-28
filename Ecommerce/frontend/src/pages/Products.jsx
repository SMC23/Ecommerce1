import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext.jsx'
import axios from 'axios'

const Products = () => {
const { addToCart }=  useContext(CartContext)
const [productos, setProductos] = useState([])

 useEffect(()=>{
  axios.get('http://localhost:3001/productos')
  .then(response=>{
    setProductos(response.data)
  })
  .catch(error=>{
    console.log('Error al cargar productos',error)
  })
 },[])
  return (
    <div>
      <h1>Productos</h1>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {productos.map(product => (
          <div key={product.id} style={{ border: "1px solid gray", padding: "10px", width: "200px" }}>
            <img src={product.imagen} alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <p>Precio: ${product.precio}</p>
            <p>Descripcion: {product.descripcion}</p>
           <button onClick={() => addToCart(product)}>Agregar al carrito</button>

          </div>



        ))}

      </div>

    </div>
  )
}

export default Products












// import React, { useState } from 'react'

// const Products = () => {
//   const [products] = useState([
//     { id: 1, name: 'Camiseta', price: 20 },
//     { id: 2, name: 'Zapatos', price: 50 },
//     { id: 3, name: 'Gorra', price: 15 },
//   ])
//   return (
//     <div>
//       <h1>Lista de Products</h1>
//       <ul>
//         {products.map((product) => (<li key={product.id}>
//           {product.name} - ${product.price}
//           <button>Añadir al carrito</button>
//         </li>))}
//       </ul>
//     </div>
//   )
// }

// export default Products