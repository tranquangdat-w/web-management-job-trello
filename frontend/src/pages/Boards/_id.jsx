// Details board
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

const Board = () => {
  return (
    <>
      <Container disableGutters={ true } maxWidth={ false } sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar />
        <BoardContent maxWidth={ false }/>
      </Container>
    </>
  )
}

export default Board

