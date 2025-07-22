import { useLocation, Link } from 'react-router-dom'
import { Box, Tabs, Tab, Paper, Grid, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import { Account } from './Account'
import { Security } from './Security'
import { useTheme } from '@mui/material/styles'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SecurityIcon from '@mui/icons-material/Security'

export const Settings = () => {
  const location = useLocation()
  const theme = useTheme()

  const isAccount = location.pathname === '/setting/account'
  const isSecurity = location.pathname === '/setting/security'

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar />
      <Grid container sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#1a2027' : '#fff'
      }}>
        <Grid item xs={12} md={1.5} sx={{
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.mode === 'dark' ? '#212f3d' : '#f7f9fc',
          minHeight: `calc(100vh - ${theme.trelloCustom.appBarHeight})`
        }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <Tabs
              orientation="vertical"
              value={location.pathname}
              aria-label="Settings tabs"
              sx={{
                '& .MuiTab-root': {
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: theme.typography.pxToRem(15),
                  marginRight: theme.spacing(1),
                  '&.Mui-selected': {
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.primary.main
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.primary.main,
                  left: 0,
                  width: '3px'
                }
              }}
            >
              <Tab
                icon={<AccountCircleIcon fontSize="small" />}
                iconPosition="start"
                label="Account"
                value="/setting/account"
                component={Link}
                to="/setting/account"
              />
              <Tab
                icon={<SecurityIcon fontSize="small" />}
                iconPosition="start"
                label="Security"
                value="/setting/security"
                component={Link}
                to="/setting/security"
              />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper elevation={0} sx={{ m: 3, p: 3, backgroundColor: theme.palette.mode === 'dark' ? '#1a2027' : '#ffff' }}>
            {isAccount && <Account />}
            {isSecurity && <Security />}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
