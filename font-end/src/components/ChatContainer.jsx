import { useChatStore } from "../store/useChatStore"
import { useEffect, useRef } from "react"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import { useAuthStore } from "../store/useAuthStore"
import avatar from '../assets/avatar.png'
import { MessageSquare } from "lucide-react"
export default function ChatContainer() {
    const { selectedUser, messages, isMessagesLoading, getMessages, subscribeToMessages, unsubscribeToMessages } = useChatStore()
    const { authUser } = useAuthStore()
    const messageEndRef = useRef(null);
    useEffect(() => {
        getMessages(selectedUser._id)

        subscribeToMessages();
        return () => {
            unsubscribeToMessages();
        }
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessages])


    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    if (isMessagesLoading) {
        return <div className="flex items-center justify-center h-full">
            
            Loading...
        </div>
    }
    console.log(messages)
    return (
        <div className="flex flex-1 flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-auto p-4 space-y-4" ref={messageEndRef}>
                {messages.map((message) => (
                    <div key={message._id} className={`chat ${message.senderId === selectedUser._id ? 'chat-start' : 'chat-end'}`}>
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img src={message.senderId !== selectedUser._id ? (authUser.profilePic ? authUser.profilePic : avatar) : (selectedUser.profilePic ? selectedUser.profilePic : avatar)} alt={message.senderId === selectedUser._id ? selectedUser.fullName : authUser.fullName} />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50">{new Date(message.createdAt).toLocaleString()}</time>
                        </div>
                        <div className="chat-bubble">
                            {message.image && <img src={message.image} alt="message" className="w-full h-48 object-cover rounded-lg" />}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <MessageInput></MessageInput>
        </div>
    )
}