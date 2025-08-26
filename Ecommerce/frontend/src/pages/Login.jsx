import { useState, useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena })
      })
      const data =await response.json()
      if (response.ok) {
        //se gaurada el token en le localstorage
        localStorage.setItem("token", data.token)
        alert('Login exitoso')
      } else{
        alert(data.message || "Error en Login")
      }
    }
    catch (error) { 
      console.error(error)
      alert('Error en el servidor')
    }
  }
  const handleOut =()=>{
    localStorage.removeItem("token")
    alert("se cerro sesion CORRECTAMENTE")

  }
  return (
    <div>
      <h2>Iniciar Sesion</h2>
      <input type="text"
        placeholder='Correo'
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input type="text"
        placeholder='Contraseña'
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <button onClick={handleLogin}> Entrar</button>
      <button onClick={handleOut}>Cerrar Sesion</button>
    </div>
  )
}

export default Login