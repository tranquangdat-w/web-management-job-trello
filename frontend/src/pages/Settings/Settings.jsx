import { useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import { Account } from './Account'
import { Security } from './Security'
import { Link } from 'react-router-dom'

export const Settings = () => {
  const location = useLocation()

  const isAccount = location.pathname === '/setting/account'
  const isSecurity = location.pathname === '/setting/security'

  return (
    <Box>
      <AppBar />
      <Box>
        <Link to='/setting/account'>
          Account
        </Link>
        |
        <Link to='/setting/security'>
          Security
        </Link>
      </Box>
      {isAccount && <Account />}
      {isSecurity && <Security />}
    </Box>
  )
}
