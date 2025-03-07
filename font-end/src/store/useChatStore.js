import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import { useAuthStore } from './useAuthStore'
export const useChatStore = create((set,get) => ({
    messages: [],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    getUsers:async()=>{
        try{
            set({isUsersLoading:true});
            const res = await axiosInstance.get('/messages/users')
            set({users:res.data,isUsersLoading:false})
        }catch(err){
            toast.error('获取用户失败')
            console.log(err)
        }finally{
            set({isUsersLoading:false})
        }
    },
    getMessages:async(userId)=>{
        try{
            set({isMessagesLoading:true})
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages:res.data,isMessagesLoading:false})
        }catch(err){
            toast.error('获取消息失败')
            set({isMessagesLoading:false})
            console.log(err)
        }finally{
            set({isMessagesLoading:false})
        }
    },
    sendMessage:async(messageData)=>{
        const {selectedUser,messages} = get()
        try{
            const res = await axiosInstance.post(`/messages/send`,messageData)
            set({messages:[...messages,messageData]})
            toast.success('消息发送成功')
        }catch(err){
            toast.error('发送消息失败')
            console.log(err)
        }
    },

    subscribeToMessages:()=>{
        const {selectedUser} = get();
        if(!selectedUser ) return;
        const {socket} = useAuthStore.getState();
        socket.on('newMessage',(message)=>{
            if(message.senderId === selectedUser._id){
                set({messages:[...get().messages,message]})
            }
        })
    },

    unsubscribeToMessages:()=>{
        const {socket} = useAuthStore.getState();
        socket.off('newMessage');
    },
    setSelectedUser: (user) => set({ selectedUser: user }),

}))