import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#000',
        backgroundImage: 'url(./images/404.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '50%',
          padding: '0 20px',
          textAlign: 'center',
          alignItems: 'center' 
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#fff', alignItems: 'center' }}>
          404 - error
        </Typography>
        <Typography variant="h4" sx={{ mb: 3, color: '#fff' }}>
          PAGE NOT FOUND
        </Typography>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '20px',
              border: '2px solid #fff',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Trello Home
          </Button>
        </Link>
      </Box>
    </Box>
  );
};