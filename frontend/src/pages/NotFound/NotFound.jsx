/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#F9FAFC',
        textAlign: 'center',
        p: 3
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#172B4D', mb: 3, fontSize: '6rem' }}>
        404 NOT FOUND
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#172B4D', mb: 1 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ color: '#5E6C84', mb: 3, maxWidth: '450px' }}>
        We can't find the page you're looking for. You can either return to your
        previous page, or go back to the Trello home page.
      </Typography>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#026AA7',
            '&:hover': { bgcolor: '#005B9A' },
            textTransform: 'none',
            fontSize: '1rem',
            px: 3,
            py: 1
          }}
        >
          Go to Trello Home
        </Button>
      </Link>
    </Box>
  )
}
