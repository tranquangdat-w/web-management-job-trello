import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import { Box } from '@mui/material'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { logOutUser, selectCurrentUser } from '~/redux/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useConfirm } from 'material-ui-confirm'
import { toast, Bounce } from 'react-toastify'
import { Link } from 'react-router-dom'

const Profiles = () => {
  const dispatch = useDispatch()
  let user = useSelector(selectCurrentUser)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const confirmLogOut = useConfirm()
  const handleLogOut = () => {
    confirmLogOut(
      {
        title: 'Log Out',
        description: 'Are you sure?',
        buttonOrder: ['confirm', 'cancel']
      }).then(() => {
      dispatch(logOutUser(user))
      toast.success('Logout successfully', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce
      })
    })
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
            src={ user?.avatar }
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
        sx={{ minWidth: 100 }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width :'30px', height: '30px', mr: 2 }} src={user?.avatar}/>
          {user?.displayName} Profile
        </MenuItem>
        <Divider />
        <Link to='/setting/account' style={{ textDecoration: 'none' }}>
          <MenuItem onClick={handleClose} sx={{
            display: 'flex',
            '& .st': {
              color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black',
            }
          }}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <Box className="st">Settings</Box>
          </MenuItem>
        </Link>
        <MenuItem
          sx={{
            '&:hover': {
              '& .logOut': {
                color: 'red'
              },
              color: 'red'
            }
          }}
          onClick={handleLogOut}>
          <ListItemIcon>
            <Logout className="logOut" fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles

