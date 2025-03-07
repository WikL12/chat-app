import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { MessageSquare,LogOut ,Settings ,Palette} from 'lucide-react'
export default function Navbar() {
    const { authUser, logOut } = useAuthStore()
    return (
        <>
            <nav className='navbar bg-base-100 '>
                <div className='navbar-start'>
                    <Link to='/' className='btn btn-ghost text-xl'>
                    <MessageSquare className="w-6 h-6 text-primary"></MessageSquare>
                    Chatty</Link>
                </div>
                <div className='navbar-end'>
                    {authUser ? (
                        <>
                            <Link to='/theme' className='btn btn-ghost'>
                            <Palette className="w-4 h-4 "></Palette>
                            theme</Link>
                            <Link to='/profile' className='btn btn-ghost'>
                            <Settings className="w-4 h-4 "></Settings>
                            Settings</Link>
                            <button className='btn btn-ghost' onClick={logOut}>
                            <LogOut className="w-4 h-4 "></LogOut>
                                Logout</button>
                        </>

                    ) : (
                        <>
                            <Link to='/login' className='btn btn-ghost'>Login</Link>
                            <Link to='/signup' className='btn btn-primary'>Signup</Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    )
}