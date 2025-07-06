/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { Box, TextField, Button, Typography, Link as MuiLink, InputAdornment, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'
import { FIELDS_REQUIRED_MESSAGE } from '~/utils/validators'
import { FieldErrorAlert } from '~/components/Form/FieldErrorAlert'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const RedAsterisk = () => <Typography component="span" sx={{ color: 'red' }}>*</Typography>

export const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')

  const verifiedEmail = searchParams.get('verifiedEmail')

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [passwordVisible, setPasswordVisible] = useState(false)

  const submitLogin = (data) => {
    const { username, password } = data
    toast.promise(
      dispatch(loginUserAPI({ username, password })),
      { pending: 'Logging in...' }
    ).then(res => {
      if (!res.error) navigate('/')
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(submitLogin)} sx={{ mt: 1 }}>
      {verifiedEmail &&
        <Typography sx={{ mb: 1, p: 1, borderRadius: '4px', bgcolor: '#CDE8F6', color: '#447EAF' }}>
          Account verified successfully. Please log in.
        </Typography>
      }
      {registeredEmail &&
        <Typography sx={{ mb: 1, p: 1, borderRadius: '4px', bgcolor: '#DDF3D5', color: '#597151' }}>
          Registration successful. Please check your email {registeredEmail} to verify your account.`
        </Typography>
      }

      <Typography sx={{ fontWeight: 'bold', mb: 0.2 }}>Username <RedAsterisk /></Typography>
      <TextField
        fullWidth
        placeholder="Enter email"
        variant="outlined"
        margin="normal"
        size="small"
        error={!!errors['email']}
        sx={{ mt: 0, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
        {...register('username', {
          required: FIELDS_REQUIRED_MESSAGE
        })}
      />
      <FieldErrorAlert errors={errors} fieldName={'username'} />

      <Typography sx={{ fontWeight: 'bold', mt: 0.5, mb: 0.2 }}>Password <RedAsterisk /></Typography>
      <TextField
        fullWidth
        placeholder="Enter password"
        type={passwordVisible ? 'text' : 'password'}
        variant="outlined"
        margin="normal"
        size="small"
        error={!!errors['password']}
        sx={{ mt: 0, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setPasswordVisible(!passwordVisible)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {passwordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        {...register('password', { required: FIELDS_REQUIRED_MESSAGE })}
      />
      <FieldErrorAlert errors={errors} fieldName={'password'} />

      <Button
        fullWidth
        variant="contained"
        color="success"
        type="submit"
        sx={{ mt: 1.5, mb: 1.5, bgcolor: '#026AA7', '&:hover': { bgcolor: '#005B9A' } }}
      >
        Log In
      </Button>

      <Box sx={{ mt: 1.5, textAlign: 'center' }}>
        <MuiLink component={Link} to="#" variant="body2">
          Can't log in?
        </MuiLink>
        <Typography variant="body2" component="span" sx={{ mx: 1 }}>•</Typography>
        <MuiLink component={Link} to="/register" variant="body2">
          Sign up for an account
        </MuiLink>
      </Box>

      <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid #ccc', textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#172B4D' }}>
          Trello helps teams move work forward.
        </Typography>
        <Typography variant="caption" sx={{ color: '#5E6C84', px: 2 }}>
          Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Trello.
        </Typography>
      </Box>
    </Box>
  )
}
