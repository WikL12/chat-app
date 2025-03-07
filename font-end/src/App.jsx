import { useState , useEffect } from 'react'

import Navbar from './components/Navbar'
import { Routes, Route ,Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'
import Theme from './pages/Theme'
function App() {
  const [count, setCount] = useState(0)
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  const {theme} = useThemeStore()
  useEffect(()=>{
    checkAuth()
  },[])
  console.log(authUser);
  if(isCheckingAuth && !authUser){
    return <div>
      <div className='flex justify-center items-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    </div>
  }
  return (
    <div data-theme={theme}>
     <Navbar></Navbar>
     <Routes>
      <Route path='/' element={authUser ?<HomePage></HomePage> : <Navigate to='/login'></Navigate>}></Route>
      <Route path='/signup' element={!authUser ?<SignUpPage></SignUpPage> : <Navigate to='/'></Navigate>}></Route>
      <Route path='/login' element={!authUser ? <LoginPage></LoginPage> : <Navigate to='/'></Navigate>}></Route>
      <Route path='/settings' element={authUser ? <SettingsPage></SettingsPage> : <Navigate to='/login'></Navigate>}></Route>
      <Route path='/profile' element={authUser ? <ProfilePage></ProfilePage> : <Navigate to='/login'></Navigate>}></Route>
      <Route path='/theme' element={authUser ? <Theme></Theme> : <Navigate to='/login'></Navigate>}></Route>
     </Routes>

     <Toaster />
    </div>
  )
}

export default App
