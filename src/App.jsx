import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function App() {
  return (
    <>
      <p>test</p>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </>
  )
}
