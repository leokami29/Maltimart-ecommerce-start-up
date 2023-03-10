import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { auth } from '../firebase.config'

import Helmet from '../components/Helmet/Helmet'

import '../Styles/login.css'
import { async } from '@firebase/util'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadign, setLoadign] = useState(false)

  const navigate = useNavigate()
  
  const singIn = async (e) => {
    e.preventDefault()
    setLoadign(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      const user = userCredential.user
      console.log(user)
      setLoadign(false)
      toast.success('Successfully logged in')
      navigate('/checkout')

    } catch (error) {
      setLoadign(false)
      toast.error(error.message)
    }
  }
  
  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
            {
              loadign ? <Col lg='12' className=' text-center'><h5 className=' fw-bold'>Loading....</h5></Col> : 
              <Col lg='6' className=' m-auto text-center'>
              <h3 className=' fw-bold mb-4'>Login</h3>
              <Form className='auth__form' onSubmit={singIn}>
                <FormGroup className='form__group'>
                  <input type="email" placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <button type='submit' className="buy__btn auth__btn">Login</button>
                <p>Don't have an account?<Link to='/signup' className='at'> Create an account</Link></p>
              </Form>
            </Col>
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Login