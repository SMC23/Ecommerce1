import { useState,useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const[ username, setUsername ]= useState('')
  const { login } = useContext(AuthContext)
  const navigate =useNavigate()

  const handleLogin =()=>{
    login(username)
    navigate('/')
  }
  return (
  <div>
    <h2>Iniciar Sesion</h2>
    <input type="text"
    placeholder='Nombre del usuario'
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    />
    <button onClick={handleLogin}> Entrar</button>
  </div>
  )
}

export default Login