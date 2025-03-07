import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'
export default function LoginPage(){
    const {isLoggingIng,logIn} = useAuthStore()
    const [formData,setFormData] = useState({
        email:'',
        passWord:''
    });
    const handleLogin = (e)=>{
        e.preventDefault();
        if(!formData.email || !formData.passWord){
            toast.error('Please fill all the fields')
            return;
        }
        logIn(formData);
    }
    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <div className='card w-96 bg-base-100 shadow-lg'>
                    <div className='card-body'>
                    <div className="text-center mb-8">
                            <div className="flex items-center justify-center flex-col gap-2 group">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                    <MessageSquare className="size-6 text-primary" />
                                </div>
                                <h1 className="text-2xl font-bold mt-2">Message Board</h1>
                            </div>
                        </div>
                        <form action="" onSubmit={handleLogin} className='space-y-6'>
                            <div className="form-control">
                                <label htmlFor="email" className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" id="email" placeholder="Email" className="input input-bordered w-full" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="password" className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" id="password" placeholder="Password" className="input input-bordered w-full" value={formData.passWord} onChange={(e)=>setFormData({...formData,passWord:e.target.value})} />
                            </div>
                            <button type="submit" disabled={isLoggingIng} className="btn btn-primary w-full mt-10">{
                                isLoggingIng ? <><Loader2 className='size-4 animate-spin' />Loading...</> : 'Login'
                                }</button>
                        </form>
                        <p className="text-sm text-base-content/60">Dident have Account? <Link to="/signup" className="text-primary">SignUp</Link></p>

                    </div>
                    
                </div>
                
            </div>  

        </>
    )
}