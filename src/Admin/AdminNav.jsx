import { Container, Row } from 'reactstrap'
import { motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'

import useAuht from '../custom-hooks/useAuht'

import '../Styles/admin-nav.css'

const admin__nav = [
  {
    display: 'Dashboard',
    path: '/dashboard'
  },

  {
    display: 'All-Products',
    path: '/dashboard/all-products'
  },

  {
    display: 'Users',
    path: '/dashboard/users'
  },

  {
    display: 'Orders',
    path: '/dashboard/orders'
  },

]

const AdminNav = () => {

  const { currentUser } = useAuht()

  return (
    <>
      <header className='admin__header'>
        <div className="admin__nav-top">
          <Container>
            <div className='admin__nav-wrapper-top'>
              <Link className=' text-decoration-none' to='/home'>
                <div className="logo">
                  <h2>Multimart</h2>
                </div>
              </Link>
              <div className="search__box">
                <input type="text" placeholder='Search....' />
                <span><i className="ri-search-line"></i></span>
              </div>
              <div className="admin__nav-top-right">
                <span><i className="ri-notification-3-line"></i></span>
                <span><i className="ri-settings-2-line"></i></span>
                <motion.img whileTap={{ scale: 1.2 }} src={currentUser && currentUser.photoURL} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className='admin__menu p-0'>
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {
                  admin__nav.map((item, index) => (
                    <li className='admin__menu-item' key={index}>
                      <NavLink
                        className={navClass=>navClass.isActive ? "active__admin-menu" : "active__admin-menuDefault"}
                        to={item.path}
                      >
                        {item.display}
                      </NavLink>

                    </li>
                  ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default AdminNav