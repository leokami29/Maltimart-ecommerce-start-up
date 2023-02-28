import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { motion } from 'framer-motion'

import products from '../assets/data/products'

import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import '../Styles/products-datails.css'

const ProductDetails = () => {

  const {id} = useParams()
  const product = products.find(item=> item.id === id)

  const {
          imgUrl,
          productName, 
          price, 
          avgRating, 
          review, 
          description, 
          shortDesc 
        } = product

  return (
    <Helmet>
      <CommonSection/>
      <section className=' pt-0'>
        <Container>
          <Row>
            <Col lang='6'>
              <img src={imgUrl} alt="" />
            </Col>
            <Col lang='6'>
              <div className="product__details">
                <h2>{productName}</h2>
                <div className='product__raiting d-flex align-content-center gap-5 mb-3'>
                  <div>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-s-fill"></i></span>
                    <span><i class="ri-star-half-fill"></i></span>
                  </div>

                  <p>(<span>{avgRating}</span>raitings)</p>
                </div>

                <span className='product__price'>${price}</span>
                <p className=' mt-3'>{shortDesc}</p>
                <motion.button whileTap={{scale: 1.3}} className='buy__btn'>Add to Cart</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetails