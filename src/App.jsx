import DarkModeIcon from '@mui/icons-material/DarkMode'
import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Container from '@mui/material/Container'

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme()

  const handleChangeSelectMode = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>  { /*  Use for componment of Mui */ }
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelid="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="mode"
        onChange={handleChangeSelectMode}
      >
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}> { /* No need thinking about name of class when use Box insteds of div, and can use advance of Mui. */ }
            <Brightness7Icon sx={{ width: 18 }}/>
            Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <DarkModeIcon sx={{ width: 18 }}/>
            Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <SettingsBrightnessIcon sx={{ width: 18 }}/>
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

const App = () => {
  return (
    <>
      <Container disableGutters={ true } maxWidth={ false } sx={{ height: '100vh' }}>
        <Box sx={{
          bgcolor: 'primary.light',
          width: '100%',
          height: (theme) => theme.trelloCustom.appBarHeight,
          display: 'flex',
          alignItems: 'center'
        }}>
          <ModeSelect />
        </Box>

        <Box sx={{
          bgcolor: 'primary.dark',
          width: '100%',
          height: (theme) => theme.trelloCustom.boardBarHeight,
          display: 'flex',
          alignItems: 'center'
        }}>
          BoardBard
        </Box>

        <Box sx={{
          bgcolor: 'primary.main',
          width: '100%',
          height: (theme) => `calc(100vh - ${theme.trelloCustom.boardBarHeight} - ${theme.trelloCustom.appBarHeight})`,
          display: 'flex',
          alignItems: 'center'
        }}>
          Board content
        </Box>
      </Container>
    </>
  )
}

export default App

