import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#ffffff',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
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
          padding: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2, ml : 35, }}>
          Sign in to<br />Trello easily
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, ml : 35, }}>
          If you don’t have an account, register now. <br />
          <Link href="#" onClick={() => setIsSignIn(false)} color="primary">
            Register here!
          </Link>
        </Typography >
        <img src="https://s3-alpha-sig.figma.com/img/feb1/4138/168afcca4345533683f89bb42220b2ef?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a2wSYz06xTL4qW5NosTgNm2z25e1hEpR7GSXSHr-6TCZK4cgvm6rl8be0E9tDIkrm5xkYH6ZlH2Vur9xCg8akt4dOwOK3a16x0~LYvlCmaVAtRFn15XRMUK4pk0j9W7FzAnXbJZbYeYCn4wiB9CPHWNtc~r7Cj5SYrExcdhWQNjxaZndA1iL7VJMXFGgUFg3dVon-BSA8W5itiJg-KyakphPeRk~F6E28DYkV~mkK1C8sT9sIt5Dhozu6zbFbCBpo5LHiHdnNi-wenEsxG5~ZorV8WBeS8amQKAH-hBR6OhUcHnvukJooUFfzw17mDMo4K-AiHtGXU15CWKpDTjfGw__" 
        alt="Illustration" style={{ width: '250px', height: 'auto' , marginLeft: '400px', marginBottom: '-100px'}} />
      </Box>

      {/* Phần bên phải */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
        }}
      >
        {/* Đăng nhập */}
        {isSignIn ? (
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Sign in
            </Typography>
            <form>
              <TextField
                fullWidth
                label="Enter email or user name"
                variant="outlined"
                margin="normal"
                required
                sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
              />
              <TextField
                fullWidth
                label="Password"
                type={passwordVisible ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                required
                sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Link href="#" color="primary" sx={{ display: 'block', marginTop: 1 }}>
                Forgot password?
              </Link>
              <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit" sx={{
                backgroundColor: '#6C63FF',
                color: '#fff',
                padding: '10px',
                }}>
                Login
              </Button>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                or continue with
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png" alt="Facebook" style={{ width: 30, height:30, margin: '0 10px' }} />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCvh-j7HsTHJ8ZckknAoiZMx9VcFmsFkv72g&s" alt="Apple" style={{ width: 30, height:30, margin: '0 10px' }} />
                <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" alt="Google" style={{ width: 30, height:30, margin: '0 10px' }} />
              </Box>
            </Box>
          </Box>
        ) : (
          /* Đăng ký */
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Sign up
            </Typography>
            <form>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
                required
              />
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
                required
              />
              <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit" sx={{
                backgroundColor: '#6C63FF',
                color: '#fff',
                padding: '10px',
                }}>
                Register
              </Button>
            </form>
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
              Already have an account?{' '}
              <Link href="#" onClick={() => setIsSignIn(true)} color="primary">
                Sign in here!
              </Link>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default LoginPage;
