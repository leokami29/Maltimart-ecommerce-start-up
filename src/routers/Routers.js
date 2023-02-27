import { Navigate, Route, Routes } from 'react-router-dom'

// --pages--
import Cart from '../pages/Cart'
import CheckOut from '../pages/CheckOut'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ProductDetails from '../pages/ProductDetails'
import Shop from '../pages/Shop'
import SignUp from '../pages/SignUp'

const Routers = () => {
  return <Routes>
    <Route path='/' element={<Navigate to='home'/>}/>
    <Route path='home' element={<Home/>}/>
    <Route path='shop' element={<Shop/>}/>
    <Route path='shop/:id' element={<ProductDetails/>}/>
    <Route path='cart' element={<Cart/>}/>
    <Route path='checkout' element={<CheckOut/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='signup' element={<SignUp/>}/>
  </Routes>
}

export default Routers