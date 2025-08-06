import { Box } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import { capitalizeFirstLetter } from '~/utils/formatters'
import PublicIcon from '@mui/icons-material/Public'
import PublicOffIcon from '@mui/icons-material/PublicOff'
import { GroupAvatar } from './GroupAvatar'
import InviteForm from './InviteForm'

const BoardBar = ({ board }) => {
  const bgColorBoardBar = (theme) => theme.palette.mode === 'dark' ? '#004065' : '#005c91'

  const MENU_STYLES = {
    bgcolor: bgColorBoardBar,
    paddingX: 0.5,
    fontWeight: 'bold',
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
        <Tooltip title={board?.description}>
          <Chip
            label={board?.title}
            clickable
            onClick={() => { }}
            sx={{
              ...MENU_STYLES,
              fontSize: '20px',
              fontWeight: 'bold'
            }}
          />
        </Tooltip>

        <Chip
          icon={(board?.type === 'public') ? <PublicIcon /> : <PublicOffIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
          onClick={() => { }}
          sx={MENU_STYLES}
        />

        <Chip
          icon={<AddToDriveIcon fontSize='small' />}
          label="Add to Google Drive"
          clickable
          onClick={() => { }}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<BoltIcon fontSize='small' />}
          label="Automatic"
          clickable
          onClick={() => { }}
          sx={MENU_STYLES}
        />
        <Chip
          icon={<FilterListIcon fontSize='small' />}
          label="Filter"
          clickable
          onClick={() => { }}
          sx={MENU_STYLES}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
        <InviteForm boardId={board._id} />
        <GroupAvatar boardUsers={board.boardUsers} limit={3} />
      </Box>
    </Box>
  )
}

export default BoardBar

