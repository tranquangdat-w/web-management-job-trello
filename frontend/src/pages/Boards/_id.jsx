// Details board
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import mockData from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = 'c755e714-6d4a-49da-b54a-26c4d12eb083'

    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])
  return (
    <>
      <Container disableGutters={ true } maxWidth={ false } sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={mockData.board}/>
        <BoardContent board={mockData.board}/>
      </Container>
    </>
  )
}

export default Board

