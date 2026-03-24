import { Navigate, Outlet } from 'react-router-dom'
import { NotFound } from '~/pages/NotFound/NotFound'

export const AdminRoute = ({ user }) => {
  if (!user) {
    return <Navigate to='/login' replace={true} />
  }

  if (user.role !== 'admin') {
    return <NotFound />
  }

  return <Outlet />
}
