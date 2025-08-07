import {
  Avatar,
  Badge,
  Box,
  Popover,
  Stack,
  Tooltip
} from '@mui/material'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { ACTION_TO_MEMBER_CARD } from '~/utils/constants'


export const CardMemberGroup = ({ boardUsers, activeCard, limit, onUpdateCardMember }) => {
  const avatarStyle = {
    height: 32,
    width: 32,
    cursor: 'pointer'
  }

  const handleOpenAvatar = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const handleUpdateCardMember = (event) => {
    // Kiem tra trang thai cua thang boardUser
    const isMember = event.currentTarget.dataset.isMember === 'member'
    const userId = event.currentTarget.dataset.userId

    // neu ma ismember thi action se la xoa no ra
    // neu ma khong phai ismember thi action se la add no vao
    const updateMember = {
      memberId: userId,
      action: isMember ? ACTION_TO_MEMBER_CARD.REMOVE : ACTION_TO_MEMBER_CARD.ADD
    }

    onUpdateCardMember({ updateMember })
  }

  return (
    <Box>
      <Stack direction="row" spacing={0.3}>
        {
          boardUsers
            .filter((user) => activeCard?.memberIds.includes(user._id))
            .filter((_, idx) => idx < limit)
            .map((user, index) =>
              <Tooltip key={index} title={user.username}>
                <Avatar
                  data-is-member={'member'}
                  data-user-id={user._id}
                  sx={avatarStyle}
                  alt={user.username}
                  src={user.avatar} />
              </Tooltip>
            )
        }
        <Box>
          <Tooltip title="Add new member to this card" >
            <Avatar
              onClick={handleOpenAvatar}
              sx={{
                ...avatarStyle, fontSize: 15, cursor: 'pointer'
              }}>
              +
            </Avatar>
          </Tooltip>
          <Popover
            // id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }} >
            <Box sx={{ p: 2 }}>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap
                sx={{ maxWidth: 5 * 32 + 16 }} >
                {boardUsers.map((user, index) => {
                  if (activeCard?.memberIds.includes(user._id)) {
                    return (
                      <Tooltip key={index} title={user.username}>
                        <Badge
                          color="success"
                          badgeContent={<CheckIcon sx={{ fontSize: 10 }} />}
                          sx={{
                            '& .MuiBadge-badge': {
                              height: 16,
                              width: 16,
                              fontSize: 10,
                              padding: '0.5px'
                            }
                          }}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                          }} >
                          <Avatar
                            data-user-id={user._id}
                            data-is-member={'member'}
                            onClick={handleUpdateCardMember}
                            sx={avatarStyle}
                            alt={user.username}
                            src={user.avatar} />
                        </Badge>
                      </Tooltip>
                    )
                  }

                  return (
                    <Tooltip key={index} title={user.username}>
                      <Avatar
                        data-user-id={user._id}
                        data-is-member={'notmember'}
                        onClick={handleUpdateCardMember}
                        sx={avatarStyle}
                        alt={user.username}
                        src={user.avatar} />
                    </Tooltip>
                  )
                })}
              </Stack>
            </Box>
          </Popover>
        </Box>
      </Stack >
    </Box >
  )
}

