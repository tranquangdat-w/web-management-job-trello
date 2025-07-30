import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Grid,
  LinearProgress
} from '@mui/material'
import { useForm } from 'react-hook-form'
import {
  FIELDS_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import { toast } from 'react-toastify'
import { logoutUserAPI, updateUserAPI } from '~/redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { useState, useMemo } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LockResetIcon from '@mui/icons-material/LockReset'
import LogoutIcon from '@mui/icons-material/Logout'
import { useConfirm } from 'material-ui-confirm'

const getPasswordStrength = (password) => {
  let strength = 0
  if (password.length > 7) strength += 1
  if (password.match(/[a-z]/)) strength += 1
  if (password.match(/[A-Z]/)) strength += 1
  if (password.match(/[0-9]/)) strength += 1
  if (password.match(/[^a-zA-Z0-9]/)) strength += 1
  return (strength / 5) * 100
}

export const Security = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: 'onChange' })
  const theme = useTheme()
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const newPassword = watch('newPassword', '')
  const passwordStrength = useMemo(() => getPasswordStrength(newPassword), [newPassword])

  const confirmChangePassowrd = useConfirm()

  const handleChangePassword = (data) => {
    confirmChangePassowrd({
      title: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LogoutIcon sx={{ color: 'warning.dark' }} /> Change Password
      </Box>,
      description: 'You need to log in again after the password is changed!',
      buttonOrder: ['confirm', 'cancel']
    }).then(() => {
      toast.promise(
        dispatch(updateUserAPI({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword
        })),
        {
          pending: 'Updating password...'
        }).then(res => {
        if (!res.error) {
          toast.success('Update user successfully')
          dispatch(logoutUserAPI())
        }
      })
    })
  }

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LockResetIcon sx={{ fontSize: 40, mr: 2, color: theme.palette.primary.main }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              Security
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Manage your password to keep your account secure. It's a good practice to use a strong password that you don't use elsewhere.
          </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit(handleChangePassword)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Old Password"
                type={showOldPassword ? 'text' : 'password'}
                variant="outlined"
                {...register('oldPassword', { required: FIELDS_REQUIRED_MESSAGE })}
                error={!!errors.oldPassword}
                helperText={errors.oldPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Box>
                <TextField
                  fullWidth
                  label="New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  variant="outlined"
                  {...register('newPassword', {
                    required: FIELDS_REQUIRED_MESSAGE,
                    pattern: {
                      value: PASSWORD_RULE,
                      message: PASSWORD_RULE_MESSAGE
                    }
                  })}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {newPassword && (
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress variant="determinate" value={passwordStrength} />
                    <Typography variant="caption" color={passwordStrength > 60 ? 'success.main' : 'warning.main'}>
                      {passwordStrength > 60 ? 'Strong' : 'Weak'} password
                    </Typography>
                  </Box>
                )}
              </Box>
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                {...register('confirmPassword', {
                  validate: (value) => value === watch('newPassword') || 'Passwords do not match'
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2, fontWeight: 'bold', textTransform: 'uppercase' }}
              >
                Update Password
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Security
