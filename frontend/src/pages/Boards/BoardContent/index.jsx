import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import Divider from '@mui/material/Divider'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddCardIcon from '@mui/icons-material/AddCard'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddIcon from '@mui/icons-material/Add'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import LinkIcon from '@mui/icons-material/Link'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const BoardContent = () => {
  const [hoverCheck, setHoverCheck] = React.useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#005485' : '#0079bf',
      width: '100%',
      height: (theme) => theme.trelloCustom.boardContentHeight,
      overflowX: 'auto',
      overflowY: 'hiddent',
      p: '10px 0'
    }}>
      { /* Box Column */ }
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}>
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#101204' : '#f1f2f4',
          ml: 2,
          borderRadius: '10px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(2)})`
        }}>

          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h6' sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Column title
            </Typography>

            <Box>
              <Button
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  minWidth: '0',
                  bgcolor: open ? '#2c3e5d' : 'transparent',
                  '&:hover': { bgcolor: '#d0d4db' },
                  paddingX: '4px',
                  paddingY: '5px'
                }}
              >
                <MoreHorizIcon
                  sx={{ color: open ? 'white' : '#8c9bab' }}
                />
              </Button>

              <Menu
                id="basic-menu-column-dropdown"
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                sx={{ mt: 1 }}
              >
                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', mb: 1 }}>Operation</Typography>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon> <AddCardIcon /> </ListItemIcon>
                  <ListItemText>Add Cart</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ContentCutIcon fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          <Box sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
              ${theme.trelloCustom.boardContentHeight} -
              ${theme.spacing(5)} -
              ${COLUMN_FOOTER_HEIGHT} -
              ${COLUMN_HEADER_HEIGHT}
            )`,
            '& .MuiCard-root': {
              overflow: 'unset'
            }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasKPDCewT1v2j4mJjfCN1rqH2SczejiwkoA&s"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card Title
                </Typography>
              </CardContent>
              <CardActions
                sx= {{
                  p: '0 4px 8px 4px',
                  '& .MuiButton-root' : {
                    ':not(:first-of-type)': {
                      marginLeft: '0px'
                    },
                    '& .MuiButton-startIcon': {
                      marginRight: '4px'
                    }
                  }
                }}>
                <Button
                  size="small"
                  startIcon={hoverCheck ? <CheckBoxOutlineBlankIcon /> : <AccessTimeIcon /> }
                  onMouseEnter={() => setHoverCheck(true)}
                  onMouseLeave={() => setHoverCheck(false)}
                >
                  20
                </Button>
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                <Button size="small" startIcon={<LinkIcon />}>10</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

          </Box>

          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1
          }}>
            <Button startIcon={<AddIcon />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                textAlign: 'left',
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#282f28' : '#d0d4db'
                }
              }}>
              <Typography>Add new card</Typography>
            </Button>
          </Box>

        </Box>
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#101204' : '#f1f2f4',
          ml: 2,
          borderRadius: '10px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)})`
        }}>

          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h6' sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Column title
            </Typography>

            <Box>
              <Button
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  minWidth: '0',
                  bgcolor: open ? '#2c3e5d' : 'transparent',
                  '&:hover': { bgcolor: '#d0d4db' },
                  paddingX: '4px',
                  paddingY: '5px'
                }}
              >
                <MoreHorizIcon
                  sx={{ color: open ? 'white' : '#8c9bab' }}
                />
              </Button>

              <Menu
                id="basic-menu-column-dropdown"
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                sx={{ mt: 1 }}
              >
                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', mb: 1 }}>Operation</Typography>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon> <AddCardIcon /> </ListItemIcon>
                  <ListItemText>Add Cart</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ContentCutIcon fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          <Box sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
              ${theme.trelloCustom.boardContentHeight} -
              ${theme.spacing(2)} -
              ${COLUMN_FOOTER_HEIGHT} -
              ${COLUMN_HEADER_HEIGHT}
            )`,
            '& .MuiCard-root': {
              overflow: 'unset'
            }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasKPDCewT1v2j4mJjfCN1rqH2SczejiwkoA&s"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card Title
                </Typography>
              </CardContent>
              <CardActions
                sx= {{
                  p: '0 4px 8px 4px',
                  '& .MuiButton-root' : {
                    ':not(:first-of-type)': {
                      marginLeft: '0px'
                    },
                    '& .MuiButton-startIcon': {
                      marginRight: '4px'
                    }
                  }
                }}>
                <Button
                  size="small"
                  startIcon={hoverCheck ? <CheckBoxOutlineBlankIcon /> : <AccessTimeIcon /> }
                  onMouseEnter={() => setHoverCheck(true)}
                  onMouseLeave={() => setHoverCheck(false)}
                >
                  20
                </Button>
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                <Button size="small" startIcon={<LinkIcon />}>10</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent sx={{ '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1
          }}>
            <Button startIcon={<AddIcon />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                textAlign: 'left',
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#282f28' : '#d0d4db'
                }
              }}>
              <Typography>Add new card</Typography>
            </Button>
          </Box>

        </Box>

      </Box>
    </Box>

  )
}

export default BoardContent

