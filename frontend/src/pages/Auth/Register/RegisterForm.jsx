import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { LoginButton } from '../Login/LoginButton'
import { FIELDS_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import { FieldErrorAlert } from '~/components/Form/FieldErrorAlert'
import { registerUserAPI } from '~/apis'
import { toast } from 'react-toastify'

export const RegisterForm =() => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const navigate = useNavigate()


  const submitRegister = data => {
    const { email, password, username } = data
    toast.promise(registerUserAPI(
      { email, password, username }
    ), { pending: 'Registration is in progress... ' }).then(user => {

      navigate(`/login?registeredEmail=${user.email}`)
    })
  }

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
        <form onSubmit={handleSubmit(submitRegister)}>
          <TextField
            fullWidth
            label="Tên tài khoản"
            variant="outlined"
            margin="normal"
            size='small'
            sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
            {...register('username', {
              required: FIELDS_REQUIRED_MESSAGE
            })}
            error={!!errors['username']}
          />
          <FieldErrorAlert errors={errors} fieldName={'username'} />
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
            {...register('password', {
              required: FIELDS_REQUIRED_MESSAGE,
              pattern: {
                value: PASSWORD_RULE,
                message: PASSWORD_RULE_MESSAGE
              }
            })}
            error={!!errors['password']}
          />
          <FieldErrorAlert errors={errors} fieldName={'password'} />
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
            error={!!errors['password_confirmation']}
          />
          <FieldErrorAlert errors={errors} fieldName={'password_confirmation'} />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            size='small'
            error={!!errors['email']}
            sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
            {...register('email', {
              required: FIELDS_REQUIRED_MESSAGE,
              pattern: {
                value: EMAIL_RULE,
                message: EMAIL_RULE_MESSAGE
              }
            })}
          />
          <FieldErrorAlert errors={errors} fieldName={'email'}/>

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
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <LoginButton />
        </Box>
      </Box>
    </Box>
  )
}
