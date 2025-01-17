import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import { NotFound } from '~/pages/NotFound/NotFound'
import { Auth } from './pages/Auth/Auth'
import { AccountVerification } from '~/pages/Auth/AccountVerification'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useSelector } from 'react-redux'
import { Settings } from '~/pages/Settings/Settings'
import Security from './pages/Settings/Security'
import Account from './pages/Settings/Account'

// import BoardPage from '~/pages/BoardPage/boardPage'
// import Home from '~/pages/HomePages/home'

import { Box } from '@mui/material'

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to='/login' replace={true} />
  }

  return <Outlet />
}

const App = () => {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={
        <Navigate to='/boards/13be383a-75e4-4025-8de3-ad31c5d79500' replace={true} />
      }/>

      <Route element={<ProtectedRoute user={currentUser} />}>
        {/*Board Details*/}
        <Route path='/boards/:boardId' element={<Board />}/>
        <Route path='/setting/account' element={<Settings />} />
        <Route path='/setting/security' element={<Settings />} />
      </Route>


      {/*Auth*/}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />} />

      {/* 404 Not found */}
      <Route path='*' element={<NotFound />}/>
    </Routes>
    
  );
};

export default App

