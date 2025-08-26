import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import axios from "axios";

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    descripcion: "",
  });

  // Cargar productos desde el backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/productos")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.log("Error al cargar productos", error);
      });
  }, []);

  // Agregar producto con autenticación JWT
  const addProduct = async () => {
    const token = localStorage.getItem("token"); // Obtener el token del login

    if (!token) {
      alert("Debes iniciar sesión para agregar productos");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/productos",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Producto agregado ✅");
        setProductos([...productos, response.data]); // Actualizamos la lista
        setNewProduct({ nombre: "", precio: "", imagen: "", descripcion: "" }); // limpiar form
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al agregar producto");
    }
  };

  return (
    <div>
      <h1>Productos</h1>

      {/* Formulario para agregar producto */}
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.nombre}
          onChange={(e) =>
            setNewProduct({ ...newProduct, nombre: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.precio}
          onChange={(e) =>
            setNewProduct({ ...newProduct, precio: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Imagen URL"
          value={newProduct.imagen}
          onChange={(e) =>
            setNewProduct({ ...newProduct, imagen: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProduct.descripcion}
          onChange={(e) =>
            setNewProduct({ ...newProduct, descripcion: e.target.value })
          }
        />
        <button onClick={addProduct}>Agregar Producto</button>
      </div>

      {/* Lista de productos */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {productos.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              width: "200px",
            }}
          >
            <img src={product.imagen} alt={product.nombre} width="100%" />
            <h3>{product.nombre}</h3>
            <p>Precio: ${product.precio}</p>
            <p>Descripcion: {product.descripcion}</p>
            <button onClick={() => addToCart(product)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
