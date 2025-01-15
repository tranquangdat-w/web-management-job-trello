import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'

export const RegisterButton = () => {
  return (
    <Link to="/register" style={{ textDecoration: 'none' }}>
      <Typography variant="body2" sx={{ mb: 1, color: 'blue' }}>
        Register here
      </Typography>
    </Link>
  )
}
