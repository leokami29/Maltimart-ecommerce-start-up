import React from 'react'
import { Col, Container, Row } from 'reactstrap'

 const AllProducts = () => {
   return <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>Arm chair</td>
                  <td>Chair</td>
                  <td>$19</td>
                  <td><button className='btn btn-danger'>Delete</button></td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
   </section>
 }
 
 export default AllProducts