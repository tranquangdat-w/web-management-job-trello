import { Box } from '@mui/material'
import Card from './Card/Card'

const ListCards = ({ headerHeight, cards }) => {
  return (
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
        ${theme.trelloCustom.columnFooterHeight} -
        ${headerHeight}
      )`,
      '& .MuiCard-root': {
        overflow: 'unset'
      }
    }}>
      {cards?.map(card => <Card key={card._id} card={card} />)}
    </Box>
  )
}

export default ListCards

