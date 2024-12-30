import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useState, useEffect } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import cloneDeep from 'lodash/cloneDeep'

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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Not use cardOrderIds because in handleDragOver cardOrderIds is create by cards, need handle data in cards and create cardOrderIds
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) => column.cards.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDrageItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    // If dragging card
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    // Drag Column is perfect
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Handle card drag over
    const { active, over } = event

    // If object drage or target is null, return
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        // Find index of overCard in overColumn
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        let newCardIndex

        // Card is dragging is below overCard or not
        const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        const nextColumns = cloneDeep(prevColumns)
        // Shadow clone of nextColumns.
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          // Remove card from active column
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // Update cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          const changedColumnIdDraggingCardData = {
            ...activeDraggingCardData,
            columnId: nextOverColumn._id
          }

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, changedColumnIdDraggingCardData)

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!active || !over) return

    // Drag Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      // Using oldColumnWhenDraggingCard State to check if card is dragging to another column. Because activeColumn is updated in handleDragOver
      // Drag card between 2 columns.
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        const { id: overCardId } = over

        setOrderedColumns(prevColumns => {
          // Find index of overCard in overColumn
          const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

          let newCardIndex

          // Card is dragging is below overCard or not
          const isBelowOverItem = active.rect.current.translated &&
            active.rect.current.translated > over.rect.top + over.rect.height

          const modifier = isBelowOverItem ? 1 : 0

          newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

          const nextColumns = cloneDeep(prevColumns)
          // Shadow clone of nextColumns.
          const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
          const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

          if (nextActiveColumn) {
            // Remove card from active column
            nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

            // Update cardOrderIds
            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
          }

          if (nextOverColumn) {
            nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
            const changedColumnIdDraggingCardData = {
              ...activeDraggingCardData,
              columnId: nextOverColumn._id
            }

            nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, changedColumnIdDraggingCardData)

            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
          }

          return nextColumns
        })
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(card => card._id === activeDragItemId)
        const newCardindex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        // This is reference variable column in orderedColumns
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardindex)
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)

          // Shadow copy
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          return nextColumns
        })
      }
    }

    // Drag Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // Find index of active colume
        const oldColumnIndex = orderedColumns.findIndex((c => c._id === active.id))

        const newColumnIndex = orderedColumns.findIndex((c => c._id === over.id))

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        // const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id) for api later

        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDrageItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
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
          {(activeDragItemId) && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} isPreview /> }
          {(activeDragItemId) && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} isPreview /> }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent

