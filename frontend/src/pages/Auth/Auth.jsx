import { Box, Typography, SvgIcon } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import { LoginForm } from './Login/LoginForm'
import { RegisterForm } from './Register/RegisterForm'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

export const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  const user = useSelector(selectCurrentUser)

  if (user) return <Navigate to='/' replace={true} />

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: (theme) => theme.palette.background.default
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        mb: 3
      }}>
        <SvgIcon component={TrelloIcon} inheritViewBox sx={{ fontSize: '2.5rem', color: (theme) => theme.palette.text.primary }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: (theme) => theme.palette.text.primary }}>
          Trello
        </Typography>
      </Box>
      <Box sx={{
        width: '100%',
        maxWidth: '360px',
        boxShadow: (theme) => theme.shadows[9],
        borderRadius: '3px',
        backgroundColor: (theme) => theme.palette.background.paper,
        p: '20px 30px'
      }}>
        <Typography variant="h6" align="center" sx={{ color: (theme) => theme.palette.text.primary, fontWeight: 'bold', mb: 2 }}>
          {isLogin ? 'Log in to continue' : 'Sign up for your account'}
        </Typography>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </Box>
    </Box>
  )
}
