import { Box } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import ChatBox from '../../../components/AppBar/Message/ChatBox'
import { capitalizeFirstLetter } from '~/utils/formatters'


const BoardBar = ({ board }) => {
  const bgColorBoardBar = (theme) => theme.palette.mode === 'dark' ? '#004065' : '#005c91'

  const MENU_STYLES = {
    bgcolor: bgColorBoardBar,
    paddingX: 0.5,
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    '& .MuiSvgIcon-root': {
      color: 'white'
    },
    '&:hover': {
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#3d7da2' : '#337da7'
    }
  }

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      paddingX: (theme) => theme.trelloCustom.barPadding,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: '1px solid #296d95',
      gap: 2,
      bgcolor: bgColorBoardBar,
      overflowX: 'auto'
    }}>
      <Box sx={{ display: 'flex', aliginItems: 'center', gap: 0.8 }}>
        <Chip
          label={board?.title}
          clickable
          onClick= {() => {}}
          sx={{
            ...MENU_STYLES,
            fontSize: '20px',
            fontWeight: 'bold'
          }}
        />

        <Chip
          icon={<VpnLockIcon fontSize='small'/>}
          label={capitalizeFirstLetter(board?.type)}
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<PersonAddAltIcon />}
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#dcdfe4',
            color: 'black',
            border: 'none',
            '&:hover': {
              border: 'none',
              bgcolor: 'white'
            }
          }}
        >
          Invite
        </Button>
        <ChatBox />
        <AvatarGroup max={4}
          sx={{
            gap: 0.7,
            '.MuiAvatar-root': {
              width: '32px',
              height: '32px',
              fontSize: '16px',
              border: 'none',
              color: 'white'
            },
            '.MuiAvatar-colorDefault': {
              bgcolor: 'grey'
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

