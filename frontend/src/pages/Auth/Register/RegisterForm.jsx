import { useState } from 'react';
import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { LoginButton } from '../Login/LoginButton';
import { FIELDS_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators';
import { FieldErrorAlert } from '~/components/Form/FieldErrorAlert';

export const RegisterForm =() => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [gender, setGender] = useState('');


  const submitRegister = data => {
    console.log(data);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

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
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ mb: -1, backgroundColor: '#F0EFFF', borderRadius: '5px' }}
            error={!!errors['gender']}
          >
            <InputLabel id="gender-label">Giới tính</InputLabel>
            <Select
              labelId="gender-label"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setValue('gender', e.target.value);
              }}
              label="Giới tính"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </Select>
          </FormControl>
          <FieldErrorAlert errors={errors} fieldName={'gender'} />
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
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <LoginButton />
        </Box>
      </Box>
    </Box>
  );
};