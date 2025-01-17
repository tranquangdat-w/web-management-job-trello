import { Box, Typography, Avatar, Grid  } from '@mui/material'

export const Account = () => {
  return (
    <Box sx={{ display: 'flex',height:'100%', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Box
          sx={{
            border: 'none',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2,
            cursor: 'pointer',
            padding: 3,
            backgroundColor: 'white',
            boxShadow: 3,
            '&:before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              width: 4,
              height: '100%',
              backgroundColor: '#E1BEE7',
              transform: 'scaleY(1)',
              transition: 'all 0.5s',
              transformOrigin: 'bottom',
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
              transformOrigin: 'bottom',
            },
            '&:hover:after': {
              transform: 'scaleY(1)',
            },
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              alt="User Avatar"
              src="https://i.pinimg.com/originals/7f/e7/96/7fe796f542d596e3ca075edfbc69c7d5.jpg"
              sx={{ width: 100, height: 100, margin: '0 auto', borderRadius: '50%' }}
            />
          </Box>

          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Typography variant="body" sx={{ backgroundColor: '#8E24AA', color: 'white', padding: '2px 10px', borderRadius: 2, width: '200px', alignItems: 'center', display: 'inline-flex', justifyContent: 'center' }}>
              Role: Admin
            </Typography>
            <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1 }}>
              {/* userName */}
              Shin Nosuke 
            </Typography>
            <Typography variant="body" sx={{fontSize: '18px'}}>
              Email: abc123@gmail.com <br />
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              DislayName: Tran Quang Dat
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              UserName: Shin Nosuke
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Account;
