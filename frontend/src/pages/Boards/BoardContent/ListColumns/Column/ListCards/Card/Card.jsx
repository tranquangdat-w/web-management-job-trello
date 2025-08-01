import { Card as MuiCard } from '@mui/material'
import { Box } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import ModeIcon from '@mui/icons-material/Mode'
import CardMedia from '@mui/material/CardMedia'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import LinkIcon from '@mui/icons-material/Link'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DeleteIcon from '@mui/icons-material/Delete'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { deleteCardAPI } from '~/apis'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import { useState } from 'react'
import { selectIsDisableDragNDrop } from '~/redux/shareState/isDisableStateSlice'
import { fetchAndSetActiveCard, updateActiveCard } from '~/redux/activeCard/activeCardSlice'

const Card = ({ card }) => {
  const isDisableDragNDrop = useSelector(selectIsDisableDragNDrop)
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card },
    disabled: isDisableDragNDrop
  })

  const dndStyleCard = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const [hoverCheck, setHoverCheck] = useState(false)

  const shouldShowCardActions = () => {
    return Boolean(card?.memberIds?.length) || !!card?.comments?.length || !!card?.attachments?.length
  }

  const deleteCard = async () => {
    await deleteCardAPI(card._id, { columnId: card.columnId })

    const newBoard = cloneDeep(board)
    const columns = newBoard.columns
    const columnHadCard = columns.find(column => {
      const cards = column.cards
      return cards.find(c => c._id == card._id)
    })

    columnHadCard.cards = columnHadCard.cards.filter(c => c._id !== card._id)
    columnHadCard.cardOrderIds = columnHadCard.cards.map(c => c._id)

    dispatch(updateCurrentActiveBoard(newBoard))
  }

  // State for the edit menu
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)

  // State for the due date picker popover
  const [datePickerAnchorEl, setDatePickerAnchorEl] = useState(null)
  const openDatePicker = Boolean(datePickerAnchorEl)
  const [selectedDate, setSelectedDate] = useState(null)


  const handleMenuClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDatePickerOpen = (event) => {
    setDatePickerAnchorEl(event.currentTarget)
    handleMenuClose() // Close the main menu
  }

  const handleDatePickerClose = () => {
    setDatePickerAnchorEl(null)
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    handleDatePickerClose()
  }

  const handleDeleteCard = (event) => {
    event.stopPropagation()
    deleteCard()
    handleMenuClose()
  }

  const setActiveCard = () => {
    dispatch(fetchAndSetActiveCard(card._id))
  }

  return (
    <>
      <MuiCard
        onClick={setActiveCard}
        ref={setNodeRef} style={dndStyleCard} {...attributes} {...listeners}
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          border: '1px solid transparent',
          '&:hover': { borderColor: (theme) => theme.palette.primary.main }
        }}>
        {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}

        <CardContent
          sx={{
            p: 1.5,
            '&:last-child': { p: 1.5 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Typography sx={{ wordBreak: 'break-word' }} >{card?.title}</Typography>
          <Box sx={{ borderRadius: '20px', paddingX: '6px', opacity: 0.1, '&:hover': { bgcolor: 'gray', opacity: 1 } }} onClick={handleMenuClick}>
            <ModeIcon sx={{ fontSize: '12px' }} />
          </Box>
        </CardContent>

        {shouldShowCardActions() &&
          <Box sx={{ p: 1 }}>
            <CardActions
              sx={{
                p: '0 4px 8px 4px',
                '& .MuiButton-root': {
                  ':not(:first-of-type)': {
                    marginLeft: '0px'
                  },
                  minWidth: 'unset',
                  lineHeight: 'unset',
                  p: '1px',
                  '& .MuiButton-startIcon': {
                    marginRight: '4px'
                  },
                  fontSize: '16px',
                  '&:hover': {
                    bgcolor: 'transparent'
                  }
                },
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 2
              }}>
              {!!card?.dueDate &&
                <Button
                  disableRipple
                  size="small"
                  startIcon={hoverCheck ? <CheckBoxOutlineBlankIcon /> : <AccessTimeIcon />}
                  onMouseEnter={() => setHoverCheck(true)}
                  onMouseLeave={() => setHoverCheck(false)}
                >
                  {card?.dueDate}
                </Button>
              }

              {Boolean(card?.memberIds?.length) && <Button size="small" disableRipple startIcon={<GroupIcon />}>{card?.memberIds.length}</Button>}

              {!!card?.comments?.length && <Button size="small" disableRipple startIcon={<CommentIcon />}>{card?.comments?.length}</Button>}

              {!!card?.attachments?.length && <Button size="small" disableRipple startIcon={<LinkIcon />}>{card?.attachments?.length}</Button>}
            </CardActions>
          </Box>
        }
      </MuiCard>

      {/* Menu for editing */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside menu from bubbling to the card
        sx={{
          mt: 1,
          '& .MuiPaper-root': {
            borderRadius: '12px',
            minWidth: '200px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '8px 0'
          },
          '& .MuiMenuItem-root': {
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#333',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#f5f5f5'
            },
            '& svg': {
              fontSize: '20px',
              color: '#888'
            }
          }
        }}
      >
        <MenuItem onClick={handleDatePickerOpen} sx={{ '& p': { color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black' } }}>
          <CalendarMonthIcon />
          <Typography>Due Date</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteCard} sx={{ '& p': { color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black' } }}>
          <DeleteIcon />
          <Typography>Delete Card</Typography>
        </MenuItem>
      </Menu>

      {/* Popover for Date Picker */}
      <Popover
        open={openDatePicker}
        anchorEl={datePickerAnchorEl}
        onClose={handleDatePickerClose}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside popover from bubbling to the card
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        sx={{ marginTop: '-60px' }}
      >
        <DatePicker
          selected={selectedDate}
          onChange={handleDateSelect}
          inline
          dateFormat="dd/MM/yyyy"
        />
      </Popover>
    </>
  )
}

export default Card
