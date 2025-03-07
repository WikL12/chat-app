import Sidebar from '../components/Sidebar'
import NochatSelected from '../components/NochatSelected'
import ChatContainer from '../components/ChatContainer'
import { useChatStore } from '../store/useChatStore'
export default function HomePage(){
    const {users,selectedUser,isUsersLoading,isMessagesLoading,getUsers,getMessages} = useChatStore()

    return (
        <div className='h-[calc(100vh-70px)] bg-base-200'>
            <div className='flex items-center justify-center pt-10 px-4' >
                <div className='bg-base-100 rounded-lg shadow-md w-full max-w-6xl h-[calc(100vh-8rem)]'>
                    <div className='flex h-full rounded-lg overflow-hidden'>
                        <Sidebar />
                        {!selectedUser ? <NochatSelected></NochatSelected> : <ChatContainer></ChatContainer>}
                    </div>
                </div>
            </div>
        </div>
    )
}