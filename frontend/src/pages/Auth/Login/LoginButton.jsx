import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'

export const LoginButton = () => {
  return (
    <Link to="/login" style={{ textDecoration: 'none' }}>
      <Typography variant="body2" sx={{ mb: 1, color: 'blue' }}>
        Login here
      </Typography>
    </Link>
  )
}
