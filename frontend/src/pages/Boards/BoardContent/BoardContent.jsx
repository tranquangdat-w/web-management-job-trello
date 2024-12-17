import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, useSensor, useSensors, MouseSensor, PointerSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useState, useEffect } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContent = ( { board } ) => {
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState(null)

  const [activeDragItemType, setActiveDrageItemType] = useState(null)

  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = (event) => {
    console.log(event)
    setActiveDragItemId(event?.active?.id)
    setActiveDrageItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

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

      setActiveDragItemId(null)
      setActiveDrageItemType(null)
      setActiveDragItemData(null)
    }
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
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
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemId) && null}
          {(activeDragItemId) && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
            <Column column={activeDragItemData} isPreview />
          }
          {(activeDragItemId) && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD &&
            <Card card={activeDragItemData} isPreview />
          }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent

