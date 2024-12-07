import { Box } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme()

  const handleChangeSelectMode = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">  { /*  Use for componment of Mui */ }
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

export default ModeSelect

