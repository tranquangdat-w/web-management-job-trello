// Details board
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import mockData from '~/apis/mock-data'
import { useState } from 'react'

const Board = () => {
  const [board, setBoard] = useState(null)

  return (
    <>
      <Container disableGutters={ true } maxWidth={ false } sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={mockData?.board}/>
        <BoardContent board={mockData?.board}/>
      </Container>
    </>
  )
}

export default Board

