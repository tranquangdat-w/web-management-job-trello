import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export default function App() {
  return (
    <>
      <DarkModeIcon fontSize="large" sx={{ color: 'red' }}/>
      <p>test</p>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </>
  )
}
