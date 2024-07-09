
import PropTypes from 'prop-types'
import useRole from '../Components/Hook/userRole'
import LoadingSpinner from '../Components/Shareds/Shared'
import { Navigate } from 'react-router-dom'
const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'Admin') return children
  return <Navigate to='/forbidden' />
}

export default AdminRoute

AdminRoute.propTypes = {
  children: PropTypes.element,
}