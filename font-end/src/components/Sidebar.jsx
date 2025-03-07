import { useChatStore } from '../store/useChatStore'
import { User } from 'lucide-react'
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import avatar from '../assets/avatar.png'

export default function Sidebar() {
    const { users, selectedUser, isUsersLoading, getUsers, setSelectedUser, } = useChatStore()
    const { onlineUsers } = useAuthStore()
    useEffect(() => {
        getUsers()
    }, [getUsers]);

    if (isUsersLoading) {
        return <div className='flex items-center justify-center h-full w-20'>
            <div className='w-10 h-10 border-t-2 border-b-2 border-primary rounded-full animate-spin'></div>
        </div>
    }

    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <User className='size-6'></User>
                    <span className='font-medium hidden lg:block'>Chat</span>
                </div>
                {/* online filter toggle */}
            </div>
            <div className='py-3 w-fulloverflow-y-auto'>
                {users.map((user) => (
                    <button key={user.id} onClick={() => setSelectedUser(user)} className={`w-full mb-2 flex items-center gap-3  p-1 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300' : ''}`}>
                        <div className="relative mx-auto lg:mx-0">
                            <img src={user.profilePic || avatar} alt={user.name} className='size-12 rounded-full object-cover' />
                            {onlineUsers.includes(user._id) && (
                                <span className='absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full ring-2 ring-zinc-900'></span>
                            )}
                        </div>

                        <div className="hidden lg:block text-left min-w-0">
                            <div className=" font-medium truncate">{user.fullName}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    )
}