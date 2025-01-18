import { useLocation } from 'react-router-dom'
import { Box, Tabs, Tab } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import { Account } from './Account'
import { Security } from './Security'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';

export const Settings = () => {
  const location = useLocation()

  const isAccount = location.pathname === '/setting/account'
  const isSecurity = location.pathname === '/setting/security'

  //color in darkmode
  const theme = useTheme();

  return (
    <Box>
      <AppBar />
      <Box sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#212f3d ' : '#f0f0f0', 
        p: 0.5}}>
        <Tabs value={location.pathname}
          sx={{ justifyContent: 'flex-start', ml:2 }}>
          <Tab
            label="Account"
            value="/setting/account"
            component={Link}
            to="/setting/account"
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              '&.Mui-selected': {
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                borderBottom: '2px solid black'
              }
            }}
          />
          <Tab
            label="Security"
            value="/setting/security"
            component={Link}
            to="/setting/security"
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              '&.Mui-selected': {
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                borderBottom: '2px solid black',
              },
            }}
          />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 ,
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#005485' : '#0079bf',
        width: '100%vh',
        height: '100vh'
      }}>
        {isAccount && <Account />}
        {isSecurity && <Security />}
      </Box>
    </Box>
  )
}

