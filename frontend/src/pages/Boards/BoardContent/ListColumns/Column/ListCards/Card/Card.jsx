import { Card as MuiCard } from '@mui/material'
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

const Card = () => {
  const [hoverCheck, setHoverCheck] = React.useState(false)

  return (
    <MuiCard sx={{
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
    </MuiCard>
  )
}

export default Card

