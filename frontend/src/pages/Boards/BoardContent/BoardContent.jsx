import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext } from '@dnd-kit/core'

const BoardContent = ( { board } ) => {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  const handleDragEnd = (event) => {
    console.log(event)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#005485' : '#0079bf',
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        overflowX: 'auto',
        overflowY: 'hiddent',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent

