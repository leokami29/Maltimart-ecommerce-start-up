import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'

import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'

import '../Styles/checkout.css'

const CheckOut = () => {

  const totalQty = useSelector(state=>state.cart.totalQuantity)
  const totalAmount = useSelector(state=>state.cart.totalAmount)

  return (
    <Helmet title='Checkout'>
      <CommonSection title='Checkout' />
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className=' mb-4 fw-bold'>Billing Information</h6>
              <Form className=' billing__form'>
                <FormGroup className="form__group">
                  <input type="text" placeholder='Enter your name' required />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="email" placeholder='Enter your email' required />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="number" placeholder='Phone number' required />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder='Street address' required />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder='City' required />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder='Postal code' required />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder='Country' required />
                </FormGroup>
              </Form>
            </Col>
            <Col lg='4'>
              <div className="checkout__cart">
                <h6>Total Qty: <span>{totalQty} items</span></h6>
                <h6>Subtotal: <span>${totalAmount}</span></h6>
                <h6><span>Shipping: <br />free shipping</span><span>$0</span></h6>
                <h4>Total Cost: <span>${totalAmount}</span></h4>
              </div>
                <motion.button whileTap={{scale:0.9}} className='buy__btn auth__btn w-100'>Place and order</motion.button> 
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default CheckOut