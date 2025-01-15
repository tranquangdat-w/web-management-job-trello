import { useState } from 'react'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { LoginButton } from '../Login/LoginButton'
import { useForm } from 'react-hook-form'

export const RegisterForm =() => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3
      }}>
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
            sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
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
              )
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
              )
            }}
            {...register('password_confirmation', {
              validate: (value) => {
                if (value === watch('password')) return true
                return 'Password Confirmation does not match'
              }
            })}
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
            sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
            InputLabelProps={{
              shrink: true
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
            sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
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
              padding: '8px'
            }}
            type="submit"
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
              Already have an account?{' '}
          <LoginButton />
        </Typography>
      </Box>
    </Box>
  )
}

