import { useLocation } from 'react-router-dom'
import { Box, Tabs, Tab } from '@mui/material'
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
      <Box sx={{ backgroundColor: '#f0f0f0', p: 0.5, }}>
        <Tabs value={location.pathname} sx={{ justifyContent: 'flex-start', ml:2 }}>
          <Tab
            label="Account"
            value="/setting/account"
            component={Link}
            to="/setting/account"
            sx={{
              color: 'black',
              '&.Mui-selected': {
                color: 'black',
                borderBottom: '2px solid black',
              },
            }}
          />
          <Tab
            label="Security"
            value="/setting/security"
            component={Link}
            to="/setting/security"
            sx={{
              color: 'black',
              '&.Mui-selected': {
                color: 'black',
                borderBottom: '2px solid black',
              },
            }}
          />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {isAccount && <Account />}
        {isSecurity && <Security />}
      </Box>
    </Box>
  )
}
