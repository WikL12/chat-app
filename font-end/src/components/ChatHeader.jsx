import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react"
import { X } from "lucide-react"
import avatar from '../assets/avatar.png'

export default function ChatHeader(){
    const {selectedUser,setSelectedUser} = useChatStore()
    const {onlineUsers} = useAuthStore()
 
        
    return (
        <div className="flex items-center justify-between p-3 border-b border-base-300">
            <div className="flex items-center gap-2">
                <img src={selectedUser?.profilePic ? selectedUser?.profilePic : avatar} alt={selectedUser?.fullName} className="size-12 rounded-full object-cover" />
                <div className="flex flex-col">
                    <p className="text-sm font-medium">{selectedUser?.fullName}</p>
                </div>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost" onClick={()=>setSelectedUser(null)} >
                <X className="size-4" />
            </button>
        </div>
    )
}   