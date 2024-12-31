import { Box } from '@mui/material'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const ListCards = ({ headerHeight, cards }) => {
  const isAddPadding = cards?.length > 0

  return (
    <SortableContext items={cards?.map(card => card._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: isAddPadding ? 2 : 0,
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
        {cards.map((card) => <Card key={card._id} card={card} />)}
      </Box>
    </SortableContext>
  )
}

export default ListCards

