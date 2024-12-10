import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import { Box } from '@mui/material'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

const Profiles = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{ paddingX: 0 }}
        >
          <Avatar sx={{ width: 32, height: 32 }}
            src="https://yt3.ggpht.com/9qASLSpof72HuZY9Q085U0k_EhBSldutj2khX7dNHPy75dXU-0vTi_Pk8jcrn5ypC-tonjL0TA=s88-c-k-c0x00ffffff-no-rj"
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="account-menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button-profile'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width :'30px', height: '30px', mr: 2 }}/> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width :'30px', height: '30px', mr: 2 }}/> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles

