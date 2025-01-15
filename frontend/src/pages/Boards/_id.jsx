// Details board
import { mapOrder } from '~/utils/sorts'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { cloneDeep } from 'lodash'
// import mockData from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardToDifferentColumnAPI } from '~/apis'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // const boardId = '67860a3b3d5db7c574af07b4' // My mongo
    const boardId = '13be383a-75e4-4025-8de3-ad31c5d79500' // Team mongo

    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

      board.columns.forEach(column => {
        column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
      })

      setBoard(board)
    })
  }, [])

  const createNewColumn = async (columnData) => {
    const newColumnData = {
      ...columnData,
      boardId : board._id
    }

    const createdColumn = await createNewColumnAPI(newColumnData)

    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds = newBoard.columns.map(col => col._id)

    setBoard(newBoard)
  }

  const createNewCard = async (cardData) => {
    const newCardData = {
      ...cardData,
      boardId : board._id
    }

    const createdCard = await createNewCardAPI(newCardData)

    const newBoard = cloneDeep(board)
    const columnHadNewCard = newBoard.columns.find(column => column._id === createdCard?.columnId)
    columnHadNewCard.cards.push(createdCard)
    columnHadNewCard.cardOrderIds = columnHadNewCard.cards.map(card => card._id)

    setBoard(newBoard)
  }

  /* Move column when drag column */
  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds


    updateBoardDetailsAPI(newBoard?._id, { columnOrderIds: dndOrderedColumnsIds })

    setBoard(newBoard)
  }

  const moveCardInSameColumn = (dndOrderedCards, columnId) => {
    const dndOrderedCardsIds = dndOrderedCards.map(c => c._id)

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    columnToUpdate.cards = dndOrderedCards
    columnToUpdate.cardOrderIds = dndOrderedCardsIds

    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardsIds })

    setBoard(newBoard)
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })

    setBoard(newBoard)
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        widht: '100vh',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: (theme) => theme.palette.primary.main
      }}>
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    )
  }

  return (
    <>
      <Container disableGutters={ true } maxWidth={ false } sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={board}/>
        <BoardContent
          board={board}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          moveColumn={moveColumn}
          moveCardInSameColumn={moveCardInSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
        />
      </Container>
    </>
  )
}

export default Board

