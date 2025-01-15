import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'

export const NotFound = () => {
  return (
    <Box>
      <Box>
        Page Not Found
      </Box>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button>Trello Home</Button>
      </Link>
    </Box>
  )
}

