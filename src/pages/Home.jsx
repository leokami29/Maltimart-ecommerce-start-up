import Helmet from '../components/Helmet/Helmet'
import ProductsList from '../components/UI/ProductsList'
import Clock from '../components/UI/Clock'
import Services from '../Services/Services'

import '../Styles/home.css'

import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import heroImg from '../assets/images/hero-img.png'
import counterImg from '../assets/images/counter-timer-img.png'
import useGetData from '../custom-hooks/useGetData'

const Home = () => {

  const { data: products, loading } = useGetData('products');

  const year = new Date().getFullYear()

  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSaleProducts, setBestSaleProducts] = useState([])
  const [mobileProducts, setMobileProducts] = useState([])
  const [wirelessProducts, setWirelessProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])

  useEffect(() => {
    const filterTrendingProducts = products.filter(item => item.category === 'chair')
    const filterBestProducts = products.filter(item => item.category === 'sofa')
    const filterMobileProducts = products.filter(item => item.category === 'mobile')
    const filterWirelessProducts = products.filter(item => item.category === 'wireless')
    const filterPopularProducts = products.filter(item => item.category === 'watch')

    setTrendingProducts(filterTrendingProducts)
    setBestSaleProducts(filterBestProducts)
    setMobileProducts(filterMobileProducts)
    setWirelessProducts(filterWirelessProducts)
    setPopularProducts(filterPopularProducts)
  }, [products])


  return <Helmet title={'Home'}>
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="hero__content">
              <p className="herosubtitle">Trending product in {year}</p>
              <h2>Make Your Interior more Minimalist & Modern </h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit eveniet autem      molestias sit quia quos, pariatur hic placeat magnam, consectetur laudantium libero impedit </p>
              <motion.button whileTap={{ scale: 1.2 }} className='buy__btn'><Link to='/shop'>SHOP NOW</Link></motion.button>
            </div>
          </Col>

          <Col lg='6' md='6'>
            <div className="hero__img">
              <img src={heroImg} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <Services />

    <section className="trending__products">
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className="section__title">Trending Products</h2>
          </Col>
            {
              loading ? <h4 className='py-5 text-center fw-bold'>Loading....</h4> : <ProductsList data={trendingProducts} />
            }
        </Row>
      </Container>
    </section>

    <section className="best__sale">
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className="section__title">Best Sales</h2>
          </Col>
          {
              loading ? <h4 className='py-5 text-center fw-bold'>Loading....</h4> : <ProductsList data={bestSaleProducts} />
            }
        </Row>
      </Container>
    </section>

    <section className="timer__count">
      <Container>
        <Row>
          <Col lg='6' md='12' className='count__down-col'>
            <div className="clock__top-content">
              <h4 className=' text-white fs-6 mb-2'>Limited Offers</h4>
              <h3 className=' text-white fs-5 mb-3'>Quality Armchair</h3>
            </div>
            <Clock />

            <motion.button whileTap={{ scale: 1.2 }} className='buy__btn store__btn'><Link to='/shop'>Visit Store</Link></motion.button>
          </Col>
          <Col lg='6' md='12' className=' text-end counter__img'>
            <img src={counterImg} alt="" />
          </Col>
        </Row>
      </Container>
    </section>
    <section className="new__arrivals">
      <Container>
        <Row>
          <Col lg='12' className=' text-center'>
            <h2 className='section__title'>New Arrivals</h2>
          </Col>
          {
              loading ? <h4 className='py-5 text-center fw-bold'>Loading....</h4> : <ProductsList data={mobileProducts} />
            }
          {
              loading ? <h4 className='py-5 text-center fw-bold'>Loading....</h4> : <ProductsList data={wirelessProducts} />
            }
        </Row>
      </Container>
    </section>

    <section className='popular__category mb-5'>
    <Container>
        <Row>
          <Col lg='12' className=' text-center'>
            <h2 className='section__title'>Popular in Category</h2>
          </Col>
          {
              loading ? <h4 className='py-5 text-center fw-bold'>Loading....</h4> : <ProductsList data={popularProducts} />
            }
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Home