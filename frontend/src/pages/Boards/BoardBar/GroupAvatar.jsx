import { Avatar, Box, Popover, Stack, Tooltip } from '@mui/material'
import { useState } from 'react'

export const GroupAvatar = ({ boardUsers, limit }) => {
  const avatarStyle = {
    height: 32,
    width: 32
  }
  const handleOpenAvatar = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Box>
      <Stack direction="row" spacing={0.3}>
        {
          (() => {
            const avatars = []
            for (let index = 0; index < boardUsers.length; index++) {
              if (index < limit) {
                avatars.push(
                  <Tooltip key={index} title={boardUsers[index].username}>
                    <Avatar sx={avatarStyle} alt={boardUsers[index].username} src={boardUsers[index].avatar} />
                  </Tooltip>
                )
                continue
              } else if (index == limit) {
                avatars.push(
                  <Box key={index}>

                    <Tooltip title="Show more" >
                      <Avatar
                        onClick={handleOpenAvatar}
                        sx={{
                          ...avatarStyle, fontSize: 15, cursor: 'pointer'
                        }}>
                        +{boardUsers.length - limit}
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
                          {boardUsers.slice(limit).map((_, index) => {
                            // Because new array of slice has index start at 0.
                            // so need to increate index with limit.
                            const newIdx = index + limit
                            return (
                              <Tooltip key={newIdx} title={boardUsers[newIdx].username}>
                                <Avatar sx={avatarStyle} alt={boardUsers[newIdx].username} src={boardUsers[newIdx].avatar} />
                              </Tooltip>
                            )
                          })}
                        </Stack>
                      </Box>
                    </Popover>

                  </Box>
                )
                continue
              }

              break
            }
            return avatars
          })()
        }
      </Stack>
    </Box>
  )
}

