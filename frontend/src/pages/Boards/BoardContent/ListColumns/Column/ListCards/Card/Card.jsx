import { Card as MuiCard } from '@mui/material'
import { Box } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
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

const Card = ({ card }) => {
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

      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography sx={{ wordBreak: 'break-word' }}>{card?.title}</Typography>
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
    </MuiCard>
  )
}

export default Card

