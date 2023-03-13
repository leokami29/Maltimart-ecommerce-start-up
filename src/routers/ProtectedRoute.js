import { Navigate, Outlet } from 'react-router-dom'
import useAuht from '../custom-hooks/useAuht'

const ProtectedRoute = () => {

    const {currentUser} = useAuht()

  return currentUser ? <Outlet/> : <Navigate to='/login'/>
}

export default ProtectedRoute