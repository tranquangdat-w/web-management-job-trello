// Details board
import { PageLoading } from '~/components/Loading/PageLoading'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { cloneDeep } from 'lodash'
import { useEffect } from 'react'

import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI
} from '~/apis'

import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ActiveCardModal from '~/components/ActiveCardModal/ActiveCardModal'
import { selectCurrentCard } from '~/redux/activeCard/activeCardSlice'

const Board = () => {
  // like store.dispatch
  const dispatch = useDispatch()

  const activeCard = useSelector(selectCurrentCard)

  const board = useSelector(selectCurrentActiveBoard)

  const { boardId } = useParams()

  useEffect(() => {
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

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

  const moveCardToDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
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
      <PageLoading />
    )
  }

  return (
    <Container disableGutters={ true } maxWidth={ false } sx={{ height: '100vh' }}>
      {activeCard && <ActiveCardModal />}
      <AppBar />
      <BoardBar board={board}/>
      <BoardContent
        board={board}
        moveColumn={moveColumn}
        moveCardInSameColumn={moveCardInSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board

