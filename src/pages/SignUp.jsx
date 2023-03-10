import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { toast } from 'react-toastify';

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../firebase.config';
import { doc, setDoc } from 'firebase/firestore';

import Helmet from '../components/Helmet/Helmet'

import '../Styles/login.css'

const SignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user
      const storageRef = ref(storage, `images/${Date.now() + username}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on((error) => {
        toast.error(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // update user profile
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          })
          //store user data in firestore databaser
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL
          })
        })
      }
      )

      setLoading(false)
      toast.success('Account created')
      navigate('/login')
    } catch (error) {
      setLoading(false)
      toast.error('Somenthing went wrong')
    }
  }

  return (
    <Helmet title='SignUp'>
      <section>
        <Container>
          <Row>
            {
              loading ? <Col lg='12' className=' text-center'><h5 className=' fw-bold'>Loading.....</h5></Col> : <Col lg='6' className=' m-auto text-center'>
                <h3 className=' fw-bold mb-4'>SignUp</h3>
                <Form className='auth__form' onSubmit={signup}>
                  <FormGroup className='form__group'>
                    <input type="text" placeholder='UserName' value={username} onChange={e => setUsername(e.target.value)} />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="email" placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="file" onChange={e => setFile(e.target.files[0])} />
                  </FormGroup>
                  <button type='submit' className="buy__btn auth__btn">Create an Account </button>
                  <p>Already have an account?<Link to='/login' className='at'> Login</Link></p>
                </Form>
              </Col>
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default SignUp