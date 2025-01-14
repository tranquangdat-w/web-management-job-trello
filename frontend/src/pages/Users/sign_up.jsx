import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment, Link, MenuItem} from '@mui/material';import { Visibility, VisibilityOff } from '@mui/icons-material';

function SignUpPage({ onSwitchToSignIn }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
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
        <Typography variant="h4" component="h1" sx={{ mb: 2, ml: 35 }}>
          Sign up to<br />Trello easily
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, ml: 35 }}>
          If you already have an account, sign in now. <br />
          <Link href="#" onClick={onSwitchToSignIn} color="primary">
            Sign in here!
          </Link>
        </Typography>
        <img
          src="https://s3-alpha-sig.figma.com/img/feb1/4138/168afcca4345533683f89bb42220b2ef?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a2wSYz06xTL4qW5NosTgNm2z25e1hEpR7GSXSHr-6TCZK4cgvm6rl8be0E9tDIkrm5xkYH6ZlH2Vur9xCg8akt4dOwOK3a16x0~LYvlCmaVAtRFn15XRMUK4pk0j9W7FzAnXbJZbYeYCn4wiB9CPHWNtc~r7Cj5SYrExcdhWQNjxaZndA1iL7VJMXFGgUFg3dVon-BSA8W5itiJg-KyakphPeRk~F6E28DYkV~mkK1C8sT9sIt5Dhozu6zbFbCBpo5LHiHdnNi-wenEsxG5~ZorV8WBeS8amQKAH-hBR6OhUcHnvukJooUFfzw17mDMo4K-AiHtGXU15CWKpDTjfGw__"
          alt="Illustration"
          style={{ width: '250px', height: 'auto', marginLeft: '400px', marginBottom: '-100px' }}
        />
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
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
            Sign up
          </Typography>
          <form>
            <TextField
                fullWidth
                label="Tên tài khoản"
                variant="outlined"
                margin="normal"
                size='small'
                sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px',}}
                required
            />
            <TextField
                fullWidth
                label="Mật khẩu"
                type={passwordVisible ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                size='small'
                required
                sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
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
            <TextField
                fullWidth
                label="Xác nhận mật khẩu"
                type={confirmPasswordVisible ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                size='small'
                required
                sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                        {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />
            <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                size='small'
                sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
                required
            />
            <TextField
                fullWidth
                label="Họ và tên đầy đủ"
                variant="outlined"
                margin="normal"
                size='small'
                sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
                required
            />
            <TextField
                fullWidth
                label="Ngày tháng năm sinh"
                type="date"
                variant="outlined"
                margin="normal"
                size='small'
                sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px', }}
                InputLabelProps={{
                shrink: true,
                }}
                required
            />
            <TextField
                fullWidth
                label="Giới tính"
                select
                variant="outlined"
                margin="normal"
                size='small'
                sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px', }}
                required
            >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
                <MenuItem value="Khác">Khác</MenuItem>
            </TextField>
            <TextField
                fullWidth
                label="Số điện thoại"
                variant="outlined"
                margin="normal"
                size='small'
                sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
                required
            />
            <TextField
                fullWidth
                label="Địa chỉ"
                variant="outlined"
                margin="normal"
                size='small'
                sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
                required
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                backgroundColor: '#6C63FF',
                color: '#fff',
                padding: '8px',
              }}
              type="submit"
            >
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
      </Box>
    </Box>
  );
}

export default SignUpPage;