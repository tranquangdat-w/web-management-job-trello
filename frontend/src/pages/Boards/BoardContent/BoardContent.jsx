import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCenter,
  pointerWithin,
  rectIntersection,
  getFirstCollision
} from '@dnd-kit/core'
import { useState, useEffect, useCallback, useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import cloneDeep from 'lodash/cloneDeep'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContent = ( { board, createNewColumn, createNewCard, moveColumn, moveCardInSameColumn, moveCardToDifferentColumn, deleteColumnDetails } ) => {
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
    setOrderedColumns(board.columns)
  }, [board])

  // Not use cardOrderIds because in handleDragOver cardOrderIds is create by cards, need handle data in cards and create cardOrderIds
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) => column.cards.map(card => card._id)?.includes(cardId))
  }

  const moveCardBetweenDiffCol = (
    active,
    over,
    activeColumn,
    overColumn,
    overCardId,
    activeDraggingCardId,
    activeDraggingCardData,
    callFrom
  ) => {
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

        // Change columnId of Cards because drag and drop between 2 columns
        const changedColumnIdDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        // Push card in column
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, changedColumnIdDraggingCardData)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      if (callFrom === 'handleDragEnd') {
        moveCardToDifferentColumn(
          activeDraggingCardId,
          oldColumnWhenDraggingCard._id,
          overColumn._id,
          nextColumns
        )
      }

      return nextColumns
    })
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

    const overIsCard = !!over?.data?.current?.columnId

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const activeColumn = findColumnByCardId(activeDraggingCardId)

    if (!overIsCard) {
      const { id : overColumnId } = over

      const overColumn = orderedColumns.find((col) => col._id === overColumnId )

      if (!activeColumn || ! overColumn) return

      setOrderedColumns((prevColumns) => {
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

          // Change columnId of Cards because drag and drop between 2 columns
          const changedColumnIdDraggingCardData = {
            ...activeDraggingCardData,
            columnId: nextOverColumn._id
          }

          // Push card in column
          nextOverColumn.cards.push(changedColumnIdDraggingCardData)

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }

    const { id: overCardId } = over

    const overColumn = findColumnByCardId(overCardId)

    if (!overColumn || !activeColumn) return

    if (overColumn._id !== activeColumn._id) {
      moveCardBetweenDiffCol(
        active,
        over,
        activeColumn,
        overColumn,
        overCardId,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      const overColumn = findColumnByCardId(overCardId)
      const activeColumn = findColumnByCardId(activeDraggingCardId)

      if (!overColumn || !activeColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDiffCol(
          active,
          over,
          oldColumnWhenDraggingCard,
          overColumn,
          overCardId,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )

      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards.findIndex(card => card._id === activeDragItemId)
        const newCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)

          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          return nextColumns
        })

        moveCardInSameColumn(dndOrderedCards, oldColumnWhenDraggingCard?._id)
      }
    }
    // Drag Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // Find index of active colume
        const oldColumnIndex = orderedColumns.findIndex((c => c._id === active.id))

        const newColumnIndex = orderedColumns.findIndex((c => c._id === over.id))

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        moveColumn(dndOrderedColumns)

        setOrderedColumns(dndOrderedColumns)
      }
    }

    // Reset State
    setActiveDragItemId(null)
    setActiveDrageItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const lastOverId = useRef(null)

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => orderedColumns.map(col => col._id).includes(container.id)
          )
        })
      }

      // Handle drage card
      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args)

      // Fix bug flickering
      if (pointerIntersections.length <= 0) return

      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppable intersecting with the pointer, return those
          pointerIntersections
          : rectIntersection(args)
      let overId = getFirstCollision(intersections, 'id')

      if (overId != null) {
        if (orderedColumns.map(c => c._id).includes(overId)) {
          const overColumn = orderedColumns.find(col => col._id == overId)

          if (overColumn?.cards?.length > 0) {
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  overColumn?.cards?.map(card => card._id)?.includes(container.id)
              )
            })[0]?.id
          }
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
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
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />
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

