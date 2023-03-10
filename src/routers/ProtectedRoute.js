import { Navigate } from 'react-router-dom'
import useAuht from '../custom-hooks/useAuht'

const ProtectedRoute = ({children}) => {

    const {currentUser} = useAuht()

  return currentUser ? children : <Navigate to='/login'/>
}

export default ProtectedRoute