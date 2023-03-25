import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import { Col, Container, Row } from 'reactstrap'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import ProductsList from '../components/UI/ProductsList'
import useGetData from '../custom-hooks/useGetData'

import '../Styles/products-datails.css'

const ProductDetails = () => {

  const dispatch = useDispatch()

  const reviewUser = useRef()
  const reviewMsg = useRef()

  const [product, setProduct] = useState({})
  const [tab, setTab] = useState('desc')
  const [rating, setRating] = useState(null)

  const { id } = useParams()
  // const product = products.find(item => item.id === id)

  const {data: products} = useGetData('products')

  const docRef = doc(db, 'products', id)

  useEffect(() => {
    const getProduct = async()=>{
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setProduct(docSnap.data())
      } else {
        toast.info('no product!')
      }
    }
    getProduct()
  })
  

  const {
    imgUrl,
    productName,
    price,
    // avgRating,
    // reviews,
    description,
    shortDesc,
    category,
  } = product

  const realtedProducts = products.filter(item => item.category === category)

  const submitHandler = (e) => {
    e.preventDefault()

    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    }
    console.log(reviewObj)
    toast.success('Review Submitted')
  }

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    )
    toast.success('Product added successfully')
  }

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className=' pt-0'>
        <Container>
          <Row>
            <Col lang='6'>
              <img src={imgUrl} alt="" />
            </Col>
            <Col lang='6'>
              <div className="product__details">
                {/* <h2>{productName}</h2> */}
                <div className='product__raiting d-flex align-content-center gap-5 mb-3'>
                  <div>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-half-fill"></i></span>
                  </div>

                  {/* <p>(<span>{avgRating}</span>raitings)</p> */}
                </div>

                <div className=' d-flex align-items-center gap-5'>
                  <span className='product__price'>${price}</span>
                  <span className=' text-uppercase'>Category: {category} </span>
                </div>
                <p className=' mt-3'>{shortDesc}</p>
                <motion.button whileTap={{ scale: 1.3 }} className='buy__btn' onClick={addToCart}>Add to Cart</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lang='12'>
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>Description</h6>
                <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={() => setTab('rev')}
                >
                  Reviews 
                  </h6>
              </div>

              {
                tab === 'desc' ? <div className="tab__content mt-4">
                  <p>{description}</p>
                </div> : <div className='product__review mt-4'>
                  <div className="review_wrapper">
                    {/* <ul>
                      {
                        reviews.map((item, index) => (
                          <li key={index} className=' mb-4'>
                            <h6>Leonel Polanco</h6>
                            <span>{item.rating}(average rating)</span>
                            <p>{item.text}</p>
                          </li>
                        ))
                      }
                    </ul> */}
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group ">
                          <input type="text" placeholder='Enter name' ref={reviewUser} required />
                        </div>
                        <div className="form__group  d-flex align-items-center gap-5 raiting__group" required>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(1)}>1<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(2)}>2<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(3)}>3<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(4)}>4<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(5)}>5<i className="ri-star-s-fill"></i></motion.span>
                        </div>
                        <div className="form__group">
                          <textarea ref={reviewMsg} rows={4} type="text" placeholder='Review Message...' required />
                        </div>
                        <motion.button whileTap={{scale:1.2}} type='submit' className="buy__btn">Submit</motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              }
            </Col>

            <Col lg='12' className=' mt-5'>
              <h2 className='related__title'>You might also like</h2>
            </Col>
            <ProductsList data={realtedProducts} />
          </Row>
        </Container>
      </section>
      
    </Helmet>
  )
}

export default ProductDetails