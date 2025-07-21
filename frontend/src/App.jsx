import { Routes, Route, Navigate } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import { NotFound } from '~/pages/NotFound/NotFound'
import { Auth } from './pages/Auth/Auth'
import { AccountVerification } from '~/pages/Auth/AccountVerification'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useSelector } from 'react-redux'
import { Settings } from '~/pages/Settings/Settings'
import { ProtectedRoute } from './pages/Auth/ProtectedRoute'
import Boards from '~/pages/Boards'

const App = () => {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={<Navigate to='/boards/1f3018c7-174d-49f0-99c2-da415b66a579' replace={true} />}/>
      <Route element={<ProtectedRoute user={currentUser} />}>
        {/*List Boards*/}
        <Route path='/boards' element={<Boards />}/>

        {/*Board Details*/}
        <Route path='/boards/:boardId' element={<Board />}/>

        {/*Settings*/}
        <Route path='/setting/account' element={<Settings />} />
        <Route path='/setting/security' element={<Settings />} />
      </Route>

      {/*Auth*/}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/users/verification' element={<AccountVerification />} />

      {/* 404 Not found */}
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App

