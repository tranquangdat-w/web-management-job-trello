import { useLocation, Link } from 'react-router-dom'
import { Box, Tabs, Tab, Grid, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import { useTheme } from '@mui/material/styles'
import PeopleIcon from '@mui/icons-material/People'
import DashboardIcon from '@mui/icons-material/Dashboard'

export const AdminLayout = ({ children }) => {
  const location = useLocation()
  const theme = useTheme()

  return (
    <Box sx={{ flexGrow: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1a2027' : '#f4f5f5', minHeight: '100vh' }}>
      <AppBar />
      <Grid container>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#212f3d' : '#fff',
            minHeight: `calc(100vh - ${theme.trelloCustom.appBarHeight})`,
            pt: 2
          }}
        >
          <Box sx={{ px: 2, mb: 2 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                letterSpacing: 1
              }}
            >
              Administration
            </Typography>
          </Box>
          <Tabs
            orientation="vertical"
            value={location.pathname}
            aria-label="Admin tabs"
            sx={{
              '& .MuiTab-root': {
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
                minHeight: 44,
                borderRadius: 1,
                mx: 1,
                '&.Mui-selected': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: 'primary.main'
                }
              },
              '& .MuiTabs-indicator': {
                display: 'none'
              }
            }}
          >
            <Tab
              icon={<PeopleIcon fontSize="small" />}
              iconPosition="start"
              label="Users"
              value="/admin/users"
              component={Link}
              to="/admin/users"
            />
            <Tab
              icon={<DashboardIcon fontSize="small" />}
              iconPosition="start"
              label="Dashboard"
              value="/admin/dashboard"
              component={Link}
              to="/admin/dashboard"
              disabled
            />
          </Tabs>
        </Grid>
        <Grid item xs={12} md={10}>
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}
