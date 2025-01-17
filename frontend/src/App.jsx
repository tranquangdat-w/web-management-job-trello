import { Routes, Route, Navigate } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import { NotFound } from '~/pages/NotFound/NotFound'
import { Auth } from './pages/Auth/Auth'

// import BoardPage from '~/pages/BoardPage/boardPage'
// import Home from '~/pages/HomePages/home'

const App = () => {
  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={
        <Navigate to='/boards/13be383a-75e4-4025-8de3-ad31c5d79500' replace={true} />
      }/>
      
      {/*Board Details*/}
      <Route path='/boards/:boardId' element={<Board />}/>

      {/*Auth*/}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />

      {/* 404 Not found */}
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App

