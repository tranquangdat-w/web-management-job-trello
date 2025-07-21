import { Box, Typography, Avatar, Paper, Grid, Divider, Button } from '@mui/material'
import { selectCurrentUser, updateUserAPI } from '~/redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import CakeIcon from '@mui/icons-material/Cake'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PersonIcon from '@mui/icons-material/Person'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import { singleFileValidator } from '~/utils/validators'
import { toast, Bounce } from 'react-toastify'

// For support upload file
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export const Account = () => {
  const dispatch = useDispatch()

  const user = useSelector(selectCurrentUser)
  const theme = useTheme()

  const handleUploadAvatar = (event) => {
    const file = event.target.files[0]

    const error = singleFileValidator(file)

    if (error) {
      toast.error(error, {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseonhover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce
      })
      return
    }

    let reqData = new FormData()
    reqData.append('avatar', file)

    // Log dữ liệu qua form data
    // reqData.forEach(value => {
    //   console.log(value)
    // })

    toast.promise(
      dispatch(updateUserAPI(reqData)),
      { pending: 'Uploading' }
    ).then(res => {
      if (!res.error) {
        toast.success('User updated successfully')
      }

      // Xóa input sau mỗi lần upload
      event.target.value = ''
    })
  }

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        backgroundColor: theme.palette.mode === 'dark' ? '#2d3748' : '#ffffff',
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Avatar
            alt={user.displayName}
            src={user.avatar}
            sx={{
              width: 150,
              height: 150,
              margin: '0 auto',
              border: `5px solid ${theme.palette.primary.main}`,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
            }}
          />
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: 2, borderRadius: '20px' }}>
            Edit avatar
            <VisuallyHiddenInput
              type="file"
              onChange={handleUploadAvatar}
              multiple
            />
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            {user.displayName}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            @{user.username}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <AlternateEmailIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
            <Typography variant="body1">{user.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <CakeIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
            <Typography variant="body1">
              Joined on {new Date(user.createdAt).toLocaleDateString('en-GB')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
            <Typography variant="body1" sx={{ textTransform: 'capitalize', fontWeight: 'medium' }}>
              {user.role}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4, borderColor: theme.palette.divider, borderWidth: '1px' }} />
      <Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Profile Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">Username</Typography>
            <Typography variant="h6">{user.username}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">Email Address</Typography>
            <Typography variant="h6">{user.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">Role</Typography>
            <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>{user.role}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default Account
