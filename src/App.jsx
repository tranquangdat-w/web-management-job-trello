import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

export default function App() {
  return (
    <>
      <DarkModeIcon />
      <Box sx={{ backgroundColor : 'red' }}>test</Box>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained" color="primary">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
      <Typography variant="body2" color="success.dark">This is a test</Typography>
    </>
  )
}

