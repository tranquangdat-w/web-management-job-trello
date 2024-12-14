import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = ( { board } ) => {
  return (
    <Box sx={{
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#005485' : '#0079bf',
      width: '100%',
      height: (theme) => theme.trelloCustom.boardContentHeight,
      overflowX: 'auto',
      overflowY: 'hiddent',
      p: '10px 0'
    }}>
      <ListColumns columns={board?.columns}/>
    </Box>
  )
}

export default BoardContent

