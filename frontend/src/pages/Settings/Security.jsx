import { Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material'
import { useState } from 'react'


export const Security = () => {
  return (
    <form>
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
              sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px', width: '400px' }}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="New password"
              variant="outlined"
              margin="normal"
              sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px', width: '400px' }}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Reenter new password"
              variant="outlined"
              margin="normal"
              sx={{ mb: 2, backgroundColor: '#F0EFFF', borderRadius: '5px', width: '400px' }}
            />
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
