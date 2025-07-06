import { Box, LinearProgress, Typography } from '@mui/material'

export const PageLoading = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f0f2f5'
    }}>
      <Box sx={{ width: '50%', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#172B4D', mb: 2 }}>
          Loading...
        </Typography>
        <LinearProgress />
      </Box>
    </Box>
  )
}

