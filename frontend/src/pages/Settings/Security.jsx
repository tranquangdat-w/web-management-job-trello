import { Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FIELDS_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import { FieldErrorAlert } from '~/components/Form/FieldErrorAlert'
import { toast } from 'react-toastify'
import { updatePasswordAPI } from '~/apis'
import { logOutUser, selectCurrentUser } from '~/redux/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'

export const Security = () => {
  const dispatch = useDispatch()
  let user = useSelector(selectCurrentUser)

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm()

  const handleChangePassWord = (data) => {
    toast.promise(updatePasswordAPI(
      { oldPassword: data?.oldPassword, newPassword: data?.newPassword }
    ), { pending: 'Change password is in progress... ' }).then(() => {
      dispatch(logOutUser(user))
    })
  }

  return (
    <form onSubmit={handleSubmit(handleChangePassWord)}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3
        }}>
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Change your password
          </Typography>
          <Box>
            <TextField
              fullWidth
              label="Old password"
              variant="outlined"
              margin="normal"
              sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px', width: '400px', className: 'newPassword' }}
              {...register('oldPassword', {
                required: FIELDS_REQUIRED_MESSAGE
              })}
              error={!!errors['oldPassword']}
            />
            <FieldErrorAlert errors={errors} fieldName={'oldPassword'} />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="New password"
              variant="outlined"
              margin="normal"
              sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px', width: '400px' }}
              {...register('newPassword', {
                required: FIELDS_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={'newPassword'} />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Reenter new password"
              variant="outlined"
              margin="normal"
              sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px', width: '400px' }}
              {...register('password_confirmation', {
                validate: (value) => {
                  if (value === watch('newPassword')) return true
                  return 'Password Confirmation does not match'
                }
              })}
              error={!!errors['password_confirmation']}
            />
            <FieldErrorAlert errors={errors} fieldName={'password_confirmation'} />
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
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  )
}

export default Security
