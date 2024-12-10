import ModeSelect from '../ModeSelect'
import { Box } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import { SvgIcon } from '@mui/material'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Started from './Menus/Started'
import Templates from './Menus/Templates'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import Button from '@mui/material/Button'
import More from './Menus/Responsive/More'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import SearchIcon from '@mui/icons-material/Search'
import {Opacity} from '@mui/icons-material'

const colorComponents = (theme) => theme.palette.mode === 'dark' ? '#9da8b7' : 'white'

const AppBar = () => {
  return (
    <>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: (theme) => theme.trelloCustom.barPadding,
        gap: 2,
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1d2125' : '#005180'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: colorComponents }}/>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#9da8b7' : 'white' }}/>
            <Typography sx={{ display: 'inline', fontSize: '1.2rem', fontWeight: 'bold', color: colorComponents }}>Trello</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <WorkSpaces />
            <Recent />
            <Started />
            <Templates />
            <Button
              variant="outlined"
              startIcon={<LibraryAddIcon />}
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: 'none',
                color: (theme) => theme.palette.mode === 'dark' ? 'black' : 'white',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#579dff' : '#33749a',
                '&:hover': { border: 'none', bgcolor: '#5c90ae' }
              }}>
              Create
            </Button>
          </Box>

          {/* For responsive */}
          <More />
        </Box>

        <Box sx ={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Search">
            <TextField
              id="outlined-search"
              type="search"
              size="small"
              placeholder='Search'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon sx={{ color: colorComponents }}/>
                  </InputAdornment>
                )
              }}
              inputProps={{
                sx: {
                  '&::placeholder': {
                    color: 'white',
                    Opacity: 1
                  }
                }
              }}
              sx={{
                width: (theme) => theme.spacing(28)
              }}
            />
          </Tooltip>
          <ModeSelect />
          <Tooltip title="Notifications">
            <Badge color="secondary" variant="dot" sx ={{ cursor: 'pointer', color: colorComponents }}>
              <NotificationsNoneIcon />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: colorComponents }}/>
          </Tooltip>

          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar

