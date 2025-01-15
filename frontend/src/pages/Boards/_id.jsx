// Details board
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { cloneDeep } from 'lodash'
import { useEffect } from 'react'
import { updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardToDifferentColumnAPI } from '~/apis'
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'

const Board = () => {
  const dispatch = useDispatch()

  const board = useSelector(selectCurrentActiveBoard)

  useEffect(() => {
    // const boardId = '67860a3b3d5db7c574af07b4' // My mongo
    const boardId = '13be383a-75e4-4025-8de3-ad31c5d79500' // Team mongo

    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch])

  /* Move column when drag column */
  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds


    updateBoardDetailsAPI(newBoard?._id, { columnOrderIds: dndOrderedColumnsIds })

    dispatch(updateCurrentActiveBoard(newBoard))
  }

  const moveCardInSameColumn = (dndOrderedCards, columnId) => {
    const dndOrderedCardsIds = dndOrderedCards.map(c => c._id)

    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    columnToUpdate.cards = dndOrderedCards
    columnToUpdate.cardOrderIds = dndOrderedCardsIds

    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardsIds })

    dispatch(updateCurrentActiveBoard(newBoard))
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

    dispatch(updateCurrentActiveBoard(newBoard))
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

          moveColumn={moveColumn}
          moveCardInSameColumn={moveCardInSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
        />
      </Container>
    </>
  )
}

export default Board

