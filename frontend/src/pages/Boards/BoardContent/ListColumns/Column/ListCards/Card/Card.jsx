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
import * as React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const Card = () => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data : { ...card }
  })

  const dndStyleCard = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const [hoverCheck, setHoverCheck] = React.useState(false)

  const shouldShowCardActions = () => {
    return Boolean(card?.memberIds?.length) || !!card?.comments?.length || !!card?.attachments?.length
  }

  //code moi them
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedDate, setSelectedDate] = React.useState(null)
  const [showDatePicker, setShowDatePicker] = React.useState(false)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setShowDatePicker(false)
  }

  return (
    <MuiCard
      ref={setNodeRef} style={dndStyleCard} {...attributes} {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        border: '1px solid transparent',
        '&:hover': { borderColor: (theme) => theme.palette.primary.main }
      }}>
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} /> }

      <CardContent sx={{
        p: 1.5,
        '&:last-child': { p: 1.5 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '272px',
      }}>
        <Typography sx={{ wordBreak: 'break-word' }}>{card?.title}</Typography>
        <Box sx={{ borderRadius: '20px', paddingX: '6px', opacity: 0.1, '&:hover': { bgcolor: 'gray', opacity: 1 }}} onClick={handleClick}>
          <ModeIcon sx ={{ fontSize: '12px' }}/>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            mt: 1,
            '& .MuiPaper-root': {
              borderRadius: '12px',
              minWidth: '200px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '8px 0',
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
                backgroundColor: '#f5f5f5',
              },
              '& svg': {
                fontSize: '20px',
                color: '#888',
              },
            },
          }}
        >
          <MenuItem onClick={() => { setShowDatePicker(true); handleClose(); }}>
            <CalendarMonthIcon /> Chọn lịch
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <DeleteIcon /> Xóa
          </MenuItem>
        </Menu>
      </CardContent>

      {shouldShowCardActions() &&
        <Box sx={{ p: 1 }}>
          <CardActions
            sx= {{
              p: '0 4px 8px 4px',
              '& .MuiButton-root' : {
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
                startIcon={hoverCheck ? <CheckBoxOutlineBlankIcon /> : <AccessTimeIcon /> }
                onMouseEnter={() => setHoverCheck(true)}
                onMouseLeave={() => setHoverCheck(false)}
              >
                {card?.dueDate}
              </Button>
            }

            {Boolean(card?.memberIds?.length) && <Button size="small" disableRipple startIcon={<GroupIcon />}>{card?.memberIds.length}</Button> }

            {!!card?.comments?.length && <Button size="small" disableRipple startIcon={<CommentIcon />}>{card?.comments?.length}</Button> }

            {!!card?.attachments?.length && <Button size="small" disableRipple startIcon={<LinkIcon />}>{card?.attachments?.length}</Button> }
          </CardActions>
        </Box>
      }

      {showDatePicker && (
        <Box sx={{ p: 2, position: 'absolute', zIndex: 999 }}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateSelect}
            inline
            dateFormat="dd/MM/yyyy"
          />
        </Box>
      )}
    </MuiCard>
  )
}

export default Card

