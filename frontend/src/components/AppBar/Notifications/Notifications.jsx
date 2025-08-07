import { useEffect, useState } from 'react'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Menu from '@mui/material/Menu'
import { Box, CircularProgress } from '@mui/material/'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearCurrentActiveNotifications,
  getBoardInvitationsAPI,
  selectCurrentActiveNotifications,
  updateInvitationAPI
} from '~/redux/actionNotifications/activeNotificationSlice'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import NotificationItem from './NotificationItem'
import { socket } from '~/socket/socket'
import { selectCurrentUser } from '~/redux/user/userSlice'

const Notifications = () => {
  const dispatch = useDispatch()
  const currentActiveNotifications = useSelector(selectCurrentActiveNotifications)
  const [isHaveNotification, setIsHaveNotification] = useState(false)
  const currentActiveUser = useSelector(selectCurrentUser)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    dispatch(clearCurrentActiveNotifications())
  }

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('FE_REGISTER_USER_NAME_SOCKET', currentActiveUser.username)
    })

    // handle when receive notification
    socket.on('receive-message', (inviteeUserName) => {
      if (inviteeUserName !== currentActiveUser.username) {
        return
      }

      if (!open) {
        setIsHaveNotification(true)
        return
      }

      dispatch(getBoardInvitationsAPI())
      setIsHaveNotification(false)

    })

    if (open) {
      setIsHaveNotification(false)
      dispatch(getBoardInvitationsAPI())
    }

    return () => {
      socket.off('connect')
      socket.off('receive-message')
    }
  }, [open, dispatch, currentActiveUser.username])

  const colorComponents = (theme) =>
    theme.palette.mode === 'dark' ? '#9da8b7' : 'white'

  return (
    <>
      <Tooltip title="Notifications">
        <Badge
          id="basic-button-notifications"
          aria-controls={open ? 'basic-menu-notifications' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          color="secondary"
          variant={isHaveNotification ? 'dot' : 'none'}
          sx={{ cursor: 'pointer', color: colorComponents }}
        >
          <NotificationsNoneIcon />
        </Badge>
      </Tooltip>
      <Menu
        id="basic-menu-notifications"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-notifications'
        }}
        sx={{ maxHeight: '800px' }}
      >
        {!currentActiveNotifications ? (
          <Box
            sx={{
              width: '350px',
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        ) : currentActiveNotifications.length > 0 ? (
          currentActiveNotifications.map((notification) => (
            <NotificationItem key={notification._id} notification={notification} />
          ))
        ) : (
          <Box
            sx={{
              width: '350px',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <NotificationsOffIcon
              sx={{ fontSize: '4rem', color: 'text.disabled' }}
            />
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              You&apos;re all caught up!
            </Typography>
          </Box>
        )}
      </Menu>
    </>
  )
}

export default Notifications
