/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { Box, TextField, Button, Typography, Link as MuiLink, InputAdornment, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import { registerUserAPI } from '~/apis'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELDS_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import { FieldErrorAlert } from '~/components/Form/FieldErrorAlert'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const RedAsterisk = () => <Typography component="span" sx={{ color: 'red' }}>*</Typography>

export const RegisterForm = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [reEnterPasswordVisible, setReEnterPasswordVisible] = useState(false)

  const submitRegister = data => {
    const { email, password, username, confirmPassword } = data
    toast.promise(registerUserAPI(
      { email, password, username, confirmPassword }
    ), { pending: 'Registration is in progress...' }).then(user => {
      toast.success('Register account successfully!', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce
      })

      navigate(`/login?registeredEmail=${user.email}`)
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(submitRegister)} sx={{ mt: 1 }}>
      <Typography sx={{ fontWeight: 'bold', mb: 0.2 }}>Username <RedAsterisk /></Typography>
      <TextField
        fullWidth
        placeholder="Enter username"
        variant="outlined"
        margin="normal"
        size="small"
        error={!!errors['username']}
        sx={{ mt: 0, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
        {...register('username', { required: FIELDS_REQUIRED_MESSAGE })}
      />
      <FieldErrorAlert errors={errors} fieldName={'username'} />

      <Typography sx={{ fontWeight: 'bold', mt: 0.5, mb: 0.2 }}>Email <RedAsterisk /></Typography>
      <TextField
        fullWidth
        placeholder="Enter email"
        variant="outlined"
        margin="normal"
        size="small"
        error={!!errors['email']}
        sx={{ mt: 0, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
        {...register('email', {
          required: FIELDS_REQUIRED_MESSAGE,
          pattern: {
            value: EMAIL_RULE,
            message: EMAIL_RULE_MESSAGE
          }
        })}
      />
      <FieldErrorAlert errors={errors} fieldName={'email'} />

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
        {...register('password', {
          required: FIELDS_REQUIRED_MESSAGE,
          pattern: {
            value: PASSWORD_RULE,
            message: PASSWORD_RULE_MESSAGE
          }
        })}
      />
      <FieldErrorAlert errors={errors} fieldName={'password'} />

      <Typography sx={{ fontWeight: 'bold', mt: 0.5, mb: 0.2 }}>Re-enter Password <RedAsterisk /></Typography>
      <TextField
        fullWidth
        placeholder="Re-enter password"
        type={reEnterPasswordVisible ? 'text' : 'password'}
        variant="outlined"
        margin="normal"
        size="small"
        error={!!errors['confirmPassword']}
        sx={{ mt: 0, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle re-enter password visibility"
                onClick={() => setReEnterPasswordVisible(!reEnterPasswordVisible)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {reEnterPasswordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        {...register('confirmPassword', {
          required: FIELDS_REQUIRED_MESSAGE,
          validate: (value) =>
            value === watch('password') || 'Passwords do not match'
        })}
      />
      <FieldErrorAlert errors={errors} fieldName={'confirmPassword'} />

      <Typography variant="body2" sx={{ my: 0.5, color: '#5E6C84' }}>
        By signing up, you confirm that you've read and accepted our <MuiLink href="#">Terms of Service</MuiLink> and <MuiLink href="#">Privacy Policy</MuiLink>.
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="success"
        type="submit"
        sx={{ mt: 1.5, mb: 1.5, bgcolor: '#026AA7', '&:hover': { bgcolor: '#005B9A' } }}
      >
        Continue
      </Button>

      <Box sx={{ mt: 1.5, textAlign: 'center' }}>
        <MuiLink component={Link} to="/login" variant="body2">
          Already have an account? Log In
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
