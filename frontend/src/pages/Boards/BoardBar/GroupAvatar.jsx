import { Avatar, Box, Popover, Stack, Tooltip } from '@mui/material'
import { useState } from 'react'

export const GroupAvatar = () => {
  const limit = 7
  const fakeArr = new Array(8)
  fakeArr.fill({
    username: 'username',
    avatar: 'https://res.cloudinary.com/dye1xowrr/image/upload/v1753888213/cards/o8reuhiqfdpfeg6fr04o.jpg'
  })
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
            for (let index = 0; index < fakeArr.length; index++) {
              if (index < limit) {
                avatars.push(
                  <Tooltip key={index} title={fakeArr[index].username}>
                    <Avatar sx={avatarStyle} alt={fakeArr[index].username} src={fakeArr[index].avatar}/>
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
                        +{fakeArr.length - limit}
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
                          {fakeArr.slice(limit).map((_, index) => (
                            <Tooltip key={index} title={`Avatar ${index + 1}`}>
                              <Avatar sx={avatarStyle} alt={fakeArr[index].username} src={fakeArr[index].avatar} />
                            </Tooltip>
                          ))}
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

