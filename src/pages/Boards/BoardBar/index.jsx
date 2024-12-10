import { Box } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

const MENU_STYLES = {
  bgcolor: 'white',
  paddingX: 2,
  color: 'primary.main',
  border: 'none',
  borderRadius: '6px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

const BoardBar = () => {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      paddingX: (theme) => theme.trelloCustom.barPadding,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: '1px solid #00bfa5',
      gap: 2
    }}>
      <Box sx={{ display: 'flex', aliginItems: 'center', gap: 2 }}>
        <Chip
          icon={<DashboardIcon fontSize='small'/>}
          label="Tran Quang Dat"
          clickable
          onClick= {() => {}}
          sx={MENU_STYLES}
        />

        <Chip
          icon={<VpnLockIcon fontSize='small'/>}
          label="Public/Private WorkSpace"
          clickable
          onClick= {() => {}}
          sx={MENU_STYLES}
        />

        <Chip
          icon={<AddToDriveIcon fontSize='small'/>}
          label="Add to Google Drive"
          clickable
          onClick= {() => {}}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<BoltIcon fontSize='small'/>}
          label="Automatic"
          clickable
          onClick= {() => {}}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<FilterListIcon fontSize='small'/>}
          label="Filter"
          clickable
          onClick= {() => {}}
          sx={MENU_STYLES}
        />

      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" size="small" sx={{ display: 'flex', alignItems: 'center' }} startIcon={<PersonAddAlt1Icon />}>
          Invite
        </Button>
        <AvatarGroup max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: '32px',
              height: '32px',
              fontSize: '16px'
            }
          }}
        >
          <Tooltip title={'name of user'}>
            <Avatar
              alt="Remy Sharp"
              src="https://yt3.ggpht.com/9qASLSpof72HuZY9Q085U0k_EhBSldutj2khX7dNHPy75dXU-0vTi_Pk8jcrn5ypC-tonjL0TA=s88-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>
          <Tooltip title={'name of user'}>
            <Avatar
              alt="Remy Sharp"
              src="https://yt3.ggpht.com/9qASLSpof72HuZY9Q085U0k_EhBSldutj2khX7dNHPy75dXU-0vTi_Pk8jcrn5ypC-tonjL0TA=s88-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>

          <Tooltip title={'name of user'}>
            <Avatar
              alt="Remy Sharp"
              src="https://yt3.ggpht.com/9qASLSpof72HuZY9Q085U0k_EhBSldutj2khX7dNHPy75dXU-0vTi_Pk8jcrn5ypC-tonjL0TA=s88-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>

          <Tooltip title={'name of user'}>
            <Avatar
              alt="Remy Sharp"
              src="https://yt3.ggpht.com/9qASLSpof72HuZY9Q085U0k_EhBSldutj2khX7dNHPy75dXU-0vTi_Pk8jcrn5ypC-tonjL0TA=s88-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>

          <Tooltip title={'name of user'}>
            <Avatar
              alt="Remy Sharp"
              src="https://yt3.ggpht.com/9qASLSpof72HuZY9Q085U0k_EhBSldutj2khX7dNHPy75dXU-0vTi_Pk8jcrn5ypC-tonjL0TA=s88-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>

          <Tooltip title={'name of user'}>
            <Avatar
              alt="Remy Sharp"
              src="https://yt3.ggpht.com/9qASLSpof72HuZY9Q085U0k_EhBSldutj2khX7dNHPy75dXU-0vTi_Pk8jcrn5ypC-tonjL0TA=s88-c-k-c0x00ffffff-no-rj"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar

