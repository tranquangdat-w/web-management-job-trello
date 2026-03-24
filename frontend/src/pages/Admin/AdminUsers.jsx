import { AdminLayout } from './AdminLayout'
import { UserManagement } from './Users/UserManagement'

export const AdminUsers = () => {
  return (
    <AdminLayout>
      <UserManagement />
    </AdminLayout>
  )
}
