import React, { useEffect } from 'react'
import { useRef } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddCardIcon from '@mui/icons-material/AddCard'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ListCards from './ListCards/ListCards'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast, Bounce } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { useDispatch, useSelector } from 'react-redux'
import { createNewCardAPI, updateColumnDetailsAPI } from '~/apis'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { cloneDeep } from 'lodash'
import { deleteColumnDetailsAPI } from '~/apis'

const Column = ({ column }) => {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const [isOpenNewCardForm, setIsOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setIsOpenNewCardForm(!isOpenNewCardForm)
  const newCardTextareaRef = useRef(null)
  const [newCardTitle, setNewCardTitle] = useState('')

  useEffect(() => {
    if (isOpenNewCardForm) {
      newCardTextareaRef.current?.focus()
    }
  }, [isOpenNewCardForm])

  const addNewCard = async () => {
    if (!newCardTitle) {
      return
    }
    const cardData = {
      title: newCardTitle,
      columnId: column?._id,
      boardId: board._id
    }
    const createdCard = await createNewCardAPI(cardData)
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(
      (c) => c._id === createdCard?.columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    dispatch(updateCurrentActiveBoard(newBoard))
    setNewCardTitle('')
    toggleOpenNewCardForm()
  }

  const handleAddNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus()
      return
    }
    addNewCard()
  }

  const [columnTitle, setColumnTitle] = useState(column.title)
  const handleUpdateColumnTitle = () => {
    const newColumnTitle = columnTitle.trim()

    setColumnTitle(newColumnTitle)

    if (!newColumnTitle) {
      setColumnTitle(column.title)
      return
    }

    if (newColumnTitle === column.title) return

    updateColumnDetailsAPI(column._id, { title: newColumnTitle }).then(
      () => {
        const newBoard = cloneDeep(board)
        const columnToUpdate = newBoard.columns.find(
          (c) => c._id === column._id
        )
        if (columnToUpdate) {
          columnToUpdate.title = newColumnTitle
        }

        dispatch(updateCurrentActiveBoard(newBoard))
      }
    )
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
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

  const orderedCards = column.cards
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

  const confirmDeleteColumn = useConfirm()

  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete Column',
      description:
        'This action will delete your column and all cards in this column! Are you sure'
    })
      .then(async () => {
        await deleteColumnDetailsAPI(column._id).then((res) => {
          toast.success(res.deleteResult, {
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

        const newBoard = cloneDeep(board)
        newBoard.columns = newBoard.columns.filter(
          (col) => col._id !== column._id
        )
        newBoard.columnOrderIds = newBoard.columns.map((col) => col._id)

        dispatch(updateCurrentActiveBoard(newBoard))
      })
      .catch(() => { })
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: (theme) => theme.trelloCustom.columnWidth,
          maxWidth: (theme) => theme.trelloCustom.columnWidth,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101204' : '#f1f2f4',
          ml: (theme) => theme.trelloCustom.marginLeftColumn,
          borderRadius: (theme) => theme.trelloCustom.borderRadiusColumn,
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
              5
            )})`,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <Box
          ref={headerRef}
          sx={{
            height: 'auto',
            paddingX: 2,
            paddingTop: 1.5,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}
        >
          <TextField
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onFocus={(e) => e.target.select()}
            onBlur={handleUpdateColumnTitle}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                e.target.blur()
              }
            }}
            variant="outlined"
            size="small"
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' }
              },
              '& .MuiInputBase-input': {
                typography: 'body1',
                fontWeight: 'bold',
                padding: '8px 10px',
                cursor: 'pointer'
              }
            }}
          />
          <Box>
            <Button
              id="basic-column-dropdown"
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                minWidth: '0px',
                bgcolor: open ? '#2c3e5d' : 'transparent',
                '&:hover': { bgcolor: '#d0d4db' },
                paddingX: '4px',
                paddingY: '5px'
              }}
            >
              <MoreHorizIcon sx={{ color: open ? 'white' : '#8c9bab' }} />
            </Button>

            <Menu
              id="basic-menu-column-dropdown"
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              onBlur={handleClose}
              TransitionComponent={Fade}
              sx={{
                mt: 1,
                '& .MuiMenuItem-root': {
                  paddingX: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.4
                }
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                Operation
              </Typography>

              <MenuItem onClick={toggleOpenNewCardForm}>
                <ListItemIcon>
                  <AddCardIcon />
                </ListItemIcon>
                <ListItemText>Add Card</ListItemText>
              </MenuItem>

              <Divider />

              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .MuiSvgIcon-root': { color: 'warning.dark' }
                  }
                }}
                onClick={handleDeleteColumn}
              >
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete this List</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* ListCards */}
        <ListCards headerHeight={headerHeight} cards={orderedCards} />

        {/* Footer */}
        <Box
          sx={{
            paddingY: 1.5,
            paddingX: 2
          }}
        >
          {!isOpenNewCardForm ? (
            <Button
              startIcon={<AddIcon />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                textAlign: 'left',
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#282f28' : '#d0d4db'
                }
              }}
              onClick={toggleOpenNewCardForm}
            >
              <Typography>Add new card</Typography>
            </Button>
          ) : (
            <Box
              sx={{
                width: '100%',
                borderRadius: (theme) => theme.trelloCustom.borderRadiusColumn,
                display: 'flex',
                alignSelf: 'flex-start',
                height: 'auto',
                flexDirection: 'column',
                gap: 1.5
              }}
            >
              <TextField
                inputRef={newCardTextareaRef}
                id="outlined-search"
                type="search"
                size="small"
                placeholder={'Enter card name'}
                autoFocus
                multiline
                onBlur={() => { setNewCardTitle(''); setIsOpenNewCardForm(false) }}
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleAddNewCard()
                  }
                }}
                inputProps={{
                  sx: {
                    '&::placeholder': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? 'white' : 'black',
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
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? 'white' : 'black',
                    fontSize: '0.875rem'
                  }
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 1
                }}>
                <Button
                  className="interceptor-loading"
                  sx={{
                    color: 'black',
                    bgcolor: '#42a5f5',
                    '&:hover': {
                      bgcolor: '#64b5f6'
                    }
                  }}
                  variant="contained"
                  size="small"
                  disableElevation={true}
                  onMouseDown={(e) => { e.preventDefault(); handleAddNewCard() }}
                >
                  Add Card
                </Button>
                <Box
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'grey.700'
                          : 'grey.300'
                    },
                    display: 'flex',
                    justifyContent: 'center',
                    p: '6px',
                    borderRadius: '4px'
                  }}
                >
                  <CloseIcon
                    fontSize="small"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? 'white' : 'black'
                    }}
                    onClick={toggleOpenNewCardForm}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column


