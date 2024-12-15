import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, useSensor, useSensors, MouseSensor, PointerSensor, TouchSensor } from '@dnd-kit/core'
import { useState, useEffect } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

const BoardContent = ( { board } ) => {
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      // Find index of active colume
      const oldIndex = orderedColumns.findIndex((c => c._id === active.id))

      const newIndex = orderedColumns.findIndex((c => c._id === over.id))

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      // const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id) for api later

      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Box sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#005485' : '#0079bf',
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        overflowX: 'auto',
        overflowY: 'hiddent',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent

