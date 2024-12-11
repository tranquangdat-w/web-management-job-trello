import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = () => {
  return (
    <Box sx={{
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#005485' : '#0079bf',
      width: '100%',
      height: (theme) => theme.trelloCustom.boardContentHeight,
      overflowX: 'auto',
      overflowY: 'hiddent',
      p: '10px 0'
    }}>
      <ListColumns />
    </Box>
  )
}

export default BoardContent

