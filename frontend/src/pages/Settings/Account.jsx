import { Box, Typography, Avatar } from '@mui/material'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'

export const Account = () => {
  const user = useSelector(selectCurrentUser)

  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Box
          sx={{
            border: 'none',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2,
            padding: 3,
            backgroundColor: theme.palette.mode === 'dark' ? '#283747' : '#fff',
            boxShadow: 3,
            '&:before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              width: 4,
              height: '100%',
              backgroundColor: theme.palette.mode === 'dark' ? '#808b96' : '#E1BEE7',
              transform: 'scaleY(1)',
              transition: 'all 0.5s',
              transformOrigin: 'bottom'
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              width: 4,
              height: '100%',
              backgroundColor: '#8E24AA',
              transform: 'scaleY(0)',
              transition: 'all 0.5s',
              transformOrigin: 'bottom'
            },
            '&:hover:after': {
              transform: 'scaleY(1)'
            }
          }}
        >
          <Box sx={{
            textAlign: 'center'
          }}>
            <Avatar
              alt="User Avatar"
              src={user.avatar}
              sx={{ width: 100, height: 100, margin: '0 auto', borderRadius: '50%', cursor: 'pointer' }}
            />
          </Box>

          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Typography variant="body" sx={{ backgroundColor: '#8E24AA', color: 'white', padding: '2px 10px', borderRadius: 2, width: '200px', alignItems: 'center', display: 'inline-flex', justifyContent: 'center' }}>
              Role: {user.role}
            </Typography>
            <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1 }}>
              {/* userName */}
              {user.username}
            </Typography>
            <Typography variant="body" sx={{ fontSize: '18px' }}>
              Email: {user.email} <br />
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              DislayName: {user.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              UserName: {user.username}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Create at: {new Date(user.createAt).toLocaleDateString('en-GB')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Account
