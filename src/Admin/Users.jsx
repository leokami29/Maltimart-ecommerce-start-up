import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Col, Container, Row } from 'reactstrap'
import { db } from '../firebase.config'

import useGetData from '../custom-hooks/useGetData'

const Users = () => {

    const { data: usersData, loading } = useGetData('users');

    const handleDeleteUser = async (id) => {
        try {
          await deleteDoc(doc(db, 'users', id));
          toast.success('User deleted successfully.');
        } catch (error) {
          toast.error('Error deleting User');
        }
      };

  return <section>
    <Container>
        <Row>
            <Col lg={12}><h4 className=' fw-bold'>Users</h4></Col>
            <Col lg={12} className='pt-5'>
                <table className=' table'>
                    <tr>
                        <th>Image</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    <tbody>
                    {
                        loading ? <h4 className=' pt-5 fw-bold'>Loading ....</h4> : usersData?.map(user => (
                            <tr key={user.uid}>
                                <td><img src={user.photoURL} alt=""/></td>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user.uid)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
                
            </Col>
        </Row>
    </Container>
  </section>
}

export default Users