import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct'
import DeleteProduct from './pages/deleteProduct'
import Register from './pages/Register'
import './App.css'

function App() {


  return (
    <>
      <nav>
        <ul>
          <li><Link to='/'>Pagina Principal</Link></li>
          <li><Link to='/products'>Productos</Link></li>
          <li><Link to='/cart'>Carrito</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/addProduct'>Agregar Productos</Link></li>
          <li><Link to='/deleteProduct'>Eliminar Productos</Link></li>
            <li><Link to="/register">Registro</Link></li> {/* 👈 nuevo */}
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>}> </Route>
        <Route path='/products'   element={<Products/>}> </Route>
        <Route path='/cart'  element={<Cart/>}> </Route>
        <Route path='/login'  element={<Login/>}> </Route> 
        <Route path='/addProduct'  element={<AddProduct/>}> </Route> 
        <Route path='/deleteProduct' element={<DeleteProduct/>}> </Route>
        <Route path="/register" element={<Register />} /> {/* 👈 nuevo */} 
      </Routes>
    </>
  )
}

export default App
