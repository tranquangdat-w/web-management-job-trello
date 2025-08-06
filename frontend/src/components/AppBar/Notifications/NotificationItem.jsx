import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Check from '@mui/icons-material/Check'
import { Box } from '@mui/material/'
import moment from 'moment'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { useDispatch } from 'react-redux'
import { updateInvitationAPI } from '~/redux/actionNotifications/activeNotificationSlice'
import { useNavigate } from 'react-router-dom'
import { INVITATION_STATUS } from '~/utils/constants'

const NotificationItem = ({ notification }) => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const handleUpdateInvitation = async (event) => {
    // nhờ gán value cho cái Button mà có thể phân biệt được
    const newStatus = event.target.value

    const result = await dispatch(updateInvitationAPI({
      invitationId: notification._id,
      status: newStatus
    }))

    if (!result.error && newStatus === INVITATION_STATUS.ACCEPTED) {
      navigate(`/boards/${notification.boardInvitation.boardId}`)
    }
  }

  return (
    <Box key={notification._id}>
      <MenuItem
        disableRipple
        sx={{
          display: 'block',
          width: '350px'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt={notification.inviter.username}
            src={notification.inviter.avatar}
          />
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            Invitation to join board{' '}
            <strong>{notification.boardTitle}</strong> from{' '}
            <strong>{notification.inviter.username}</strong>
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ ml: 6 }}>
          {moment(notification.createdAt).fromNow()}
        </Typography>

        {notification.boardInvitation.status === INVITATION_STATUS.PENDING && (
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              value={INVITATION_STATUS.ACCEPTED}
              size="small"
              variant="contained"
              color="success"
              onClick={handleUpdateInvitation}
              startIcon={<Check />}
            >
              Accept
            </Button>
            <Button
              value={INVITATION_STATUS.REJECTED}
              size="small"
              variant="outlined"
              color="error"
              onClick={handleUpdateInvitation}
              sx={{ ml: 1 }}
            >
              Decline
            </Button>
          </Box>
        )}

        {notification.boardInvitation.status === INVITATION_STATUS.REJECTED && (
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              variant="body2"
              sx={{
                fontStyle: 'italic',
                color: (theme) => theme.palette.error.main
              }}
            >
              Invitation rejected
            </Typography>
          </Box>
        )}
        {notification.boardInvitation.status === INVITATION_STATUS.ACCEPTED && (
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              variant="body2"
              sx={{
                fontStyle: 'italic',
                color: (theme) => theme.palette.success.main
              }}
            >
              Invitation accepted
            </Typography>
          </Box>
        )}
      </MenuItem>
      <Divider />
    </Box>
  )
}

export default NotificationItem
