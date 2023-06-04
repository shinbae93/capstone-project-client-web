import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PrivateRoute = () => {
  const { currentUser } = useAuth()
  const location = useLocation()

  return currentUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRoute
