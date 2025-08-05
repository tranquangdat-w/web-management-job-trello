import { Card as MuiCard } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import ModeIcon from '@mui/icons-material/Mode'
import CardMedia from '@mui/material/CardMedia'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CommentIcon from '@mui/icons-material/Comment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import 'react-datepicker/dist/react-datepicker.css'
import { deleteCardAPI, updateCardAPI } from '~/apis'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import { selectIsDisableDragNDrop } from '~/redux/shareState/isDisableStateSlice'
import { fetchAndSetActiveCard } from '~/redux/activeCard/activeCardSlice'
import moment from 'moment'

const Card = ({ card }) => {
  const [isDone, setIsDone] = useState(card.isDone)
  const isDisableDragNDrop = useSelector(selectIsDisableDragNDrop)
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  useEffect(() => {
    setIsDone(card.isDone)
  }, [card.isDone])

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
    return Boolean(card?.memberIds?.length) || !!card?.comments?.length || card?.dueDate
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

  const handleMenuClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteCard = (event) => {
    event.stopPropagation()
    deleteCard()
    handleMenuClose()
  }

  const showCardModal = () => {
    dispatch(fetchAndSetActiveCard(card._id))
  }

  const handleUpdateIsComplete = (e) => {
    e.stopPropagation()

    updateCardAPI(card._id, {
      isDone: !isDone
    }).then(() => {
      const newBoard = cloneDeep(board)
      const columns = newBoard.columns

      for (let i = 0; i < columns.length; i++) {
        if (columns[i]._id != board?.columnId) {
          continue
        }

        const cards = columns[i].cards
        for (let j = 0; j < cards.length; j++) {
          if (cards[j]._id == board?._id) {
            cards[j].isDone = !isDone
            break
          }
        }

        break
      }

      dispatch(updateCurrentActiveBoard(newBoard))
      setIsDone(!isDone)
    })
  }

  return (
    <>
      <MuiCard
        onClick={showCardModal}
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}>
            {isDone && <CheckCircleIcon sx={{ height: '15px' }} />}
            <Typography sx={{ wordBreak: 'break-word' }}>
              {card?.title}
            </Typography>
          </Box>
          <Box
            sx={{
              borderRadius: '20px',
              paddingX: '6px',
              opacity: 0.1,
              '&:hover': {
                bgcolor: 'gray', opacity: 1
              }
            }}
            onClick={handleMenuClick}>
            <ModeIcon sx={{ fontSize: '12px' }} />
          </Box>
        </CardContent>

        {shouldShowCardActions() &&
          <Box sx={{ paddingX: 1.5, marginTop: -1, paddingBottom: 1 }}>
            <CardActions
              sx={{
                p: 0,
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
                gap: 1
              }}>
              {!!card?.dueDate &&
                <Button
                  disableRipple
                  onMouseEnter={() => setHoverCheck(true)}
                  onMouseLeave={() => setHoverCheck(false)}
                  onClick={handleUpdateIsComplete}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '3px',
                    bgcolor: isDone ? '#43a047 !important' : 'auto',
                    color: isDone ? 'black' : 'grey',
                    '&:hover': {
                      bgcolor: isDone ? '#43a047 !important' : 'auto'
                    }
                  }} >
                  {hoverCheck && !isDone ?
                    <CheckBoxOutlineBlankIcon sx={{ height: 17, width: 17 }} />
                    : <AccessTimeIcon sx={{ height: 17, width: 17 }} />}
                  <Typography variant="caption">
                    {moment(card?.dueDate).calendar()}
                  </Typography>
                </Button>
              }
              {!!card?.comments?.length && (
                <Button
                  disableRipple
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1px',
                    color: 'grey'
                  }} >
                  <CommentIcon sx={{ height: 17, width: 17 }} />
                  <Typography variant="caption">
                    {card?.comments?.length}
                  </Typography>
                </Button>
              )}
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
        }} >
        <MenuItem onClick={handleDeleteCard} sx={{ '& p': { color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black' } }}>
          <DeleteIcon />
          <Typography>Delete Card</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default Card


