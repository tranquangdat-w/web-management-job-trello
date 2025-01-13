import React, { useEffect } from 'react'
import { useRef } from 'react'
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
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast, Bounce } from 'react-toastify'

const Column = ( { column }) => {
  const [isOpenNewCardForm, setIsOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setIsOpenNewCardForm(!isOpenNewCardForm)

  const [newCardTitle, setNewCardTitle] = useState('')

  const addNewCard = () => {
    if (!newCardTitle) {

      return
    }
    toast.success('Created new card!', {
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
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const style = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : 1
  }

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [headerHeight, setHeaderHeight] = React.useState(0)
  const headerRef = useRef(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const height = headerRef?.current?.offsetHeight + 'px'
    setHeaderHeight(height)
  }, [column.title])

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: (theme) => theme.trelloCustom.columnWidth,
          maxWidth: (theme) => theme.trelloCustom.columnWidth,
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#101204' : '#f1f2f4',
          ml: (theme) => theme.trelloCustom.marginLeftColumn,
          borderRadius: (theme) => theme.trelloCustom.borderRadiusColumn,
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)})`,
          display: 'flex',
          flexDirection: 'column'
        }}>

        {/* Header */}
        <Box
          ref={headerRef}
          sx={{
            height: 'auto',
            paddingX: 2,
            pt: 2,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}>
          <Box>
            <Typography variant='h6' sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              wordBreak: 'break-word'
            }}>
              { column?.title }
            </Typography>
          </Box>

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

        {/* ListCards */}
        <ListCards headerHeight={headerHeight} cards={orderedCards}/>

        {/* Footer */}
        <Box sx={{
          // height: (theme) => theme.trelloCustom.columnFooterHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          // mb: 1,
          // mt: 1
        }}>
          {!isOpenNewCardForm
            ? <Button startIcon={<AddIcon />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                textAlign: 'left',
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#282f28' : '#d0d4db'
                }
              }}
              onClick={toggleOpenNewCardForm}
            >
              <Typography>Add new card</Typography>
            </Button>
            : <Box sx={{
              width: '100%',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#101204' : '#f1f2f4',
              // marginX: (theme) => theme.trelloCustom.marginLeftColumn,
              borderRadius: (theme) => theme.trelloCustom.borderRadiusColumn,
              display: 'flex',
              alignSelf: 'flex-start',
              height: 'auto',
              flexDirection: 'column',
              gap: 1.5
            }}
            >
              <TextField
                id="outlined-search"
                type="search"
                size="small"
                placeholder={'Enter card name'}
                autoFocus
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                inputProps={{
                  sx: {
                    '&::placeholder': {
                      color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black',
                      opacity: 0.8,
                      fontSize: '0.875rem'
                    }
                  }
                }}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'gray' },
                    '&:hover fieldset': { borderColor: '#03a9f4' },
                    '&.Mui-focused fieldset': { borderColor: '#03a9f4' }
                  },
                  '& .MuiInputBase-root': {
                    color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black',
                    fontSize: '0.875rem'
                  }
                }}
              />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 1
              }}>
                <Button sx={{
                  color: 'black',
                  bgcolor: '#42a5f5',
                  '&:hover': {
                    bgcolor: '#64b5f6'
                  }
                }}
                variant="contained"
                size="small"
                disableElevation={true}
                onClick={addNewCard}
                >
                  Add Card
                </Button>
                <CloseIcon fontSize="small" sx={{ color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black', cursor: 'pointer' }}
                  onClick={toggleOpenNewCardForm}
                />
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column

