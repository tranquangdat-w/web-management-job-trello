import { useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { LoginForm } from './Login/LoginForm'
import { RegisterForm } from './Register/Register'
import { LoginButton } from './Login/LoginButton'
import { RegisterButton } from './Register/RegisterButton'

export const Auth = () => {
  const location = useLocation()

  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#ffffff',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        alignItems: 'center',
        gap: 2,
        paddingRight: 3
      }}
    >
      {/* Phần bên trái */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 3
        }}>
        <Typography variant="h3" component="h2" sx={{ mb: 2, ml: 35 }}>
          {isLogin && 'Sign in' } {isRegister && 'Register'} to<br />Trello easily
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, ml: 35 }}>
          {isLogin && 'If you don’t have an account, register now.'}
          {isRegister && 'If you have an account, login now.'}
          <br />
          {isLogin && <RegisterButton />}
          {isRegister && <LoginButton />}
        </Typography>
        <img
          src="https://s3-alpha-sig.figma.com/img/feb1/4138/168afcca4345533683f89bb42220b2ef?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a2wSYz06xTL4qW5NosTgNm2z25e1hEpR7GSXSHr-6TCZK4cgvm6rl8be0E9tDIkrm5xkYH6ZlH2Vur9xCg8akt4dOwOK3a16x0~LYvlCmaVAtRFn15XRMUK4pk0j9W7FzAnXbJZbYeYCn4wiB9CPHWNtc~r7Cj5SYrExcdhWQNjxaZndA1iL7VJMXFGgUFg3dVon-BSA8W5itiJg-KyakphPeRk~F6E28DYkV~mkK1C8sT9sIt5Dhozu6zbFbCBpo5LHiHdnNi-wenEsxG5~ZorV8WBeS8amQKAH-hBR6OhUcHnvukJooUFfzw17mDMo4K-AiHtGXU15CWKpDTjfGw__"
          alt="Illustration"
          style={{ width: '250px', height: 'auto', marginLeft: '400px', marginBottom: '-100px' }}
        />
      </Box>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </Box>
  )
}

