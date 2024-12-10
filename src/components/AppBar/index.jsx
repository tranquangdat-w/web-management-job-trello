import ModeSelect from '../ModeSelect'
import { Box } from '@mui/material'
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
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'primary.main' }}/>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }}/>
            <Typography sx={{ display: 'inline', fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Trello</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <WorkSpaces />
            <Recent />
            <Started />
            <Templates />
            <Button variant="outlined" startIcon={<LibraryAddIcon />} sx={{ display: 'flex', alignItems: 'center' }}>
              Create
            </Button>
          </Box>

          {/* For responsive */}
          <More />
        </Box>

        <Box sx ={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Search">
            <TextField id="outlined-search" label="Search..." type="search" size="small"
              sx={{
                width: (theme) => theme.spacing(28)
              }}
            />
          </Tooltip>
          <ModeSelect />
          <Tooltip title="Notifications">
            <Badge color="secondary" variant="dot" sx ={{ cursor: 'pointer', color: 'primary.main' }}>
              <NotificationsNoneIcon />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }}/>
          </Tooltip>

          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar

