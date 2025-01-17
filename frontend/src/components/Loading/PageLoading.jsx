import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export const PageLoading = () => {
  return (
    <Box sx={{
      display: 'flex',
      widht: '100vh',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: (theme) => theme.palette.primary.main
    }}>
      <CircularProgress sx={{ color: 'white' }} />
    </Box>
  )
}
