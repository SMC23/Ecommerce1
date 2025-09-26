import { useState } from "react";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setcContrasena] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3001/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contrasena }),
      });
      
      const data = await response.json();
      console.log("Respuesta del backend:", data);
      if (response.ok) {
        alert("Usuario registrado ✅");

        // Opcional: iniciar sesión automático
        localStorage.setItem("token", data.token);
      } else {
        alert(data.message || "Error al registrar");
      }
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setcContrasena(e.target.value)}
      />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default Register;
