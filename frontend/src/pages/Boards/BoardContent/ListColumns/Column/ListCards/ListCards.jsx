import { Box } from '@mui/material'
import Card from './Card/Card'

const ListCards = () => {
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
        ${theme.trelloCustom.columnHeaderHeight}
      )`,
      '& .MuiCard-root': {
        overflow: 'unset'
      }
    }}>
      <Card />
      <Card />
    </Box>
  )
}

export default ListCards
