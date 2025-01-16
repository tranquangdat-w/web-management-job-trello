import { Routes, Route, Navigate } from 'react-router-dom';
import Board from '~/pages/Boards/_id';
import { NotFound } from '~/pages/NotFound/NotFound';
import { Auth } from './pages/Auth/Auth';
import Home from '~/pages/HomePages/home'; 
const App = () => {
  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={
        <Navigate to='/home' replace={true} />
      }/>

      {/* Home */}
      <Route path='/home' element={<Home />} />

      {/* Board Details */}
      <Route path='/boards/:boardId' element={<Board />}/>

      {/* Auth */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />

      {/* 404 Not found */}
      <Route path='*' element={<NotFound />}/>
    </Routes>
  );
}

export default App;