import './header.css'

import logo from '../../assets/images/eco-logo.png'
import user_icon from '../../assets/images/user-icon.png'

import { Container, Row } from 'reactstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'

import useAuht from '../../custom-hooks/useAuht'
import { toast } from 'react-toastify'

const nav__links = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'cart',
    display: 'Cart'
  },
]

const Header = () => {

  const navigate = useNavigate()

  const headerRef = useRef(null)

  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const profieleActionsRef = useRef(null)

  const menuRef = useRef(null)

  const { currentUser } = useAuht()

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

  const logout = () =>{
     signOut(auth).then(()=>{
      navigate('/home')
      toast.success('Logged out')
     }).catch(err=>{
        toast.error(err.message)
     })
  }

  useEffect(() => {
    stickyHeaderFunc()

    return () => window.removeEventListener('scroll', stickyHeaderFunc)
  })

  const menuToggle = () => menuRef.current.classList.toggle('active__menu')

  const navigateToCart = () => {
    navigate('/cart')
  }

  const toggleProfileActions = () => profieleActionsRef.current.classList.toggle('show__profileActions')

  return <header className='header' ref={headerRef}>
    <Container>
      <Row>
        <div className='nav__wrapper'>
          <div className='logo'>
            <img src={logo} alt="logo" />
            <div>
              <h1>Multimart</h1>
            </div>
          </div>

          <div className="navigation" ref={menuRef} onClick={menuToggle}>
            <ul className="menu">
              {
                nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="nav__icons">
            <span className='fav__icon'>
              <i className="ri-heart-line"></i>
              <span className="badgee">1</span>
            </span>
            <span className='cart__icon' onClick={navigateToCart}>
              <i className="ri-shopping-bag-line"></i>
              <span className="badgee">{totalQuantity}</span>
            </span>
            <div className='profile'>
              {/* slace para hacer escala al icono de el usuario */}
              <motion.img whileTap={{ scale: 1.2 }} src={currentUser ? currentUser.photoURL : user_icon} alt="" onClick={toggleProfileActions}/>
              <div className="profile__actions" ref={profieleActionsRef} onClick={toggleProfileActions}>
                {
                  currentUser ? <span onClick={logout}>Logout</span> : 
                  <div className=' d-flex align-items-center justify-content-center flex-column'>
                    <Link className='text-decoration-none text-white' to='/login'>Login</Link> 
                    <Link className='text-decoration-none text-white' to='/signup'>Signup</Link> 
                  </div>
                }
              </div>

            </div>
            <div className="mobile__menu">
              <span onClick={menuToggle}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>

        </div>
      </Row>
    </Container>
  </header>
}

export default Header