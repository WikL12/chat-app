import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import { toast } from 'react-hot-toast'
import { io } from 'socket.io-client'
export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,
    isCheckingAuth: true,
    onlineUsers:[],
    scoket:null,
    checkAuth:async()=>{
        try{
            const res = await axiosInstance.get('/auth/check')
            set({authUser:res.data})
            get().connectSocket();
        }catch(err){
            set({authUser:null})
            console.log(err)
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signUp:async(formData)=>{
        try{
            set({isSigningUp:true})
            const res = await axiosInstance.post('/auth/signup',formData)
            set({isSigningUp:false})
            toast.success('注册成功')
        }catch(err){
            set({isSigningUp:false})
            toast.error('注册失败')
            console.log(err)
        }
    },
    logOut:async()=>{   
        try{
            const res = await axiosInstance.post('/auth/logout')
            set({authUser:null})
            toast.success('退出登录成功！')
            get().disconnectSocket();
        }catch(err){
            console.log(err)
            toast.error('退出登录失败！')

        }
    },
    logIn:async(formData)=>{
        try{
            set({isLoggingIng:true})
            const res = await axiosInstance.post('/auth/login',formData)
            set({authUser:res.data})
            set({isLoggingIng:false})
            toast.success('登录成功！')
            get().connectSocket();
        }catch(err){
            set({isLoggingIng:false})
            toast.error('登录失败！')
            console.log(err)
        }
    },
    updateProfile:async(formData)=>{
        try{
            set({isUpdatingProfile:true})
            const res = await axiosInstance.put('/auth/update',formData)
            set({authUser:res.data})
            set({isUpdatingProfile:false})
            toast.success('更新成功！')
        }catch(err){
            set({isUpdatingProfile:false})
            toast.error('更新失败！')
            console.log(err)
        }
    },
    connectSocket:()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io(import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '/',{
            query:{
                userId:authUser._id,
            }
        });
        socket.connect();
        set({socket});

        socket.on('getOnlineUsers',(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected){
            get().socket.disconnect();
        }
    },
   
}))
