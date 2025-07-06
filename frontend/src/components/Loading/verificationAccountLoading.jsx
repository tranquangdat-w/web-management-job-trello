import { Box, CircularProgress, Typography } from '@mui/material'

function VerificationAccountLoading() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: 2
    }}>
      <CircularProgress />
      <Typography variant="h6">Verifying your account...</Typography>
      <Typography variant="body1">Please wait a moment.</Typography>
    </Box>
  )
}

export default VerificationAccountLoading