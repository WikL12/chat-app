import { MessageSquare , Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
export default function SignUpPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        passWord: ''
    })
    const {signUp,isSigningUp} = useAuthStore()
    const validateForm = () => {
        if(formData.fullName.trim().length == 0 || formData.email.trim().length == 0 || formData.passWord.length < 6){
            toast.error('您的输入有误！')
            return false
        }
        return true
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validateForm();
        if(isValid){
            signUp(formData)
        }
    }
    return (
        <>
            <div className='min-h-screen grid lg:grid-cols-2'>
                {/* leftSide */}
                <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:col-span-2">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center flex-col gap-2 group">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                    <MessageSquare className="size-6 text-primary" />
                                </div>
                                <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                                <p className="text-base-content/60">Create an account to get started</p>
                            </div>
                        </div>
                        <form action="" onSubmit={handleSubmit} className='space-y-6'>
                            <div className="form-control">
                                <label htmlFor="fullName" className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" id="fullName" placeholder="Full Name" className="input input-bordered w-full" value={formData.fullName} onChange={(e)=>setFormData({...formData,fullName:e.target.value})} />
                            </div>
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
                            <button type="submit" disabled={isSigningUp} className="btn btn-primary w-full mt-10">{
                                isSigningUp ? <><Loader2 className='size-4 animate-spin' />Loading...</> : 'Sign Up'
                                }</button>
                        </form>
                        <p className="text-sm text-base-content/60">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
                    </div>
                </div>
                {/* rightSide */}
                
            </div>
        </>
    )
}