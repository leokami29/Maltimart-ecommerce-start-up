import { addDoc, collection,updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { db, storage } from '../firebase.config'

const AddProducts = () => {

  const [enterTitle, setEnterTitle] = useState('')
  const [enterShortDesc, setEnterShortDesc] = useState('')
  const [enterDescription, setEnterDescription] = useState('')
  const [enterPrice, setEnterPrice] = useState('')
  const [enterCategory, setEnterCategory] = useState('')
  const [enterProdutImg, setEnterProdutImg] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const addProduct = async (e) => {
    e.preventDefault()
    setLoading(true)

    //===== add product to the firebase database =====
    try {
      const collectionRef = collection(db, 'products');
      const docRef = await addDoc(collectionRef, {
        title: enterTitle,
        shortDesc: enterShortDesc,
        description: enterDescription,
        category: enterCategory,
        price: enterPrice,
      });
      const storageRef = ref(storage, `productImages/${docRef.id}_${enterProdutImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProdutImg);
    
      uploadTask.on('state_changed', null, (error) => {
        toast.error('Images not uploaded!');
        console.error(error);
      }, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(docRef, { imgUrl: downloadURL });
        setLoading(false)
        toast.success('Product successfully added!');
        navigate('/dashboard/all-products')
      });
    } catch (error) {
      setLoading(false)
      toast.error('Product not added!');
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            {
              loading ? <h4 className=' py-5'>Loading........</h4> :  <>
                <h4 className=' mb-5'>Add Product</h4>
            <Form onSubmit={addProduct}>
              <FormGroup className='form__group'>
                <span>Product Title</span>
                <input type="text" required placeholder='Double Sofa' value={enterTitle}
                  onChange={e => setEnterTitle(e.target.value)} />
              </FormGroup>
              <FormGroup className='form__group'>
                <span>Short Description</span>
                <input type="text" required placeholder='Lorem .... ' value={enterShortDesc}
                  onChange={e => setEnterShortDesc(e.target.value)} />
              </FormGroup>
              <FormGroup className='form__group'>
                <span>Description</span>
                <input type="text" required placeholder='Description .... ' value={enterDescription}
                  onChange={e => setEnterDescription(e.target.value)} />
              </FormGroup>
              <div className=' d-flex align-items-center justify-content-between gap-5'>
                <FormGroup className='form__group w-50'>
                  <span>Price</span>
                  <input type="number" required placeholder='$1222' value={enterPrice}
                    onChange={e => setEnterPrice(e.target.value)} />
                </FormGroup>
                <FormGroup className='form__group w-50'>
                  <span>Category</span>
                  <select className=' w-100 p-2' value={enterCategory}
                    onChange={e => setEnterCategory(e.target.value)}>
                    <option value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobil">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </FormGroup>
              </div>
              <div>
                <FormGroup className='form__group'>
                  <span>Product Image</span>
                  <input type="file" onChange={e => setEnterProdutImg(e.target.files[0])} required />
                </FormGroup>
              </div>
              <button className='buy__btn' type='submit'>Add Products</button>
            </Form>
              </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AddProducts