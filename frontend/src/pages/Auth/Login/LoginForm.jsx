import { useState } from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import { RegisterButton } from '../Register/RegisterButton'
import { useForm } from 'react-hook-form'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'


import {
  FIELDS_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import { FieldErrorAlert } from '~/components/Form/FieldErrorAlert'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let [searchParams] = useSearchParams()

  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitLogin = (data) => {
    const { email, password } = data
    toast.promise(
      dispatch(loginUserAPI({ email, password })),
      { pending: 'Login is in progress... ' }).then(res => {
      if (!res.error) navigate('/')
    })
  }

  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3
        }}>
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Sign in
          </Typography>
          {verifiedEmail &&
            <Box>
              heeh
            </Box>
          }
          {registeredEmail &&
            <Box>
              haha
            </Box>
          }
          <Box>
            <TextField
              fullWidth
              label="Enter email or user name"
              variant="outlined"
              margin="normal"
              error={!!errors['email']}
              sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px', width: '400px' }}
              {...register('email', {
                required: FIELDS_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                }
              })}
            />

            <FieldErrorAlert errors={errors} fieldName={'email'}/>
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Password"
              type={passwordVisible ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              error={!!errors['password']}
              sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
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
            />
            <FieldErrorAlert errors={errors} fieldName={'password'}/>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#6C63FF',
                color: '#fff',
                padding: '10px'
              }}
              type="submit"
            >
              Login
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <RegisterButton />
          </Box>
        </Box>
      </Box>
    </form>
  )
}

