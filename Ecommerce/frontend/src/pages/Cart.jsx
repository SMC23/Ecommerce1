import { useContext } from "react";
import { CartContext } from "../context/CartContext"

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext)

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              <strong>{product.nombre}</strong> - ${product.precio}
              <button onClick={() => removeFromCart(product.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Cart;
