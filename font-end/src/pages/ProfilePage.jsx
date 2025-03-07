import { useAuthStore } from '../store/useAuthStore'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Loader2 ,Camera} from 'lucide-react'
import avatar from '../assets/avatar.png'
export default function ProfilePage() {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if(!file){
            toast.error('请选择一个图片')
            return;
        }
        if(file.size > 2 * 1024 * 1024){
            toast.error('图片大小不能超过2MB')
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e) => {
            const base64Image = e.target.result;
            setSelectedImage(base64Image);
            try{
                await updateProfile({profilePic:base64Image});
                toast.success('头像更新成功');
            }catch(err){
                console.log(err);
                toast.error('头像更新失败');
            }
        }
    }
    return (
        <>
            <div className='h-auto pt-20'>
                <div className='max-w-2xl mx-auto p-4 py-8'>
                    <div className="bg-base-300 rounded-xl p-6 space-y-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">个人资料</h1>
                            <p className="mt-2">更新你的个人资料</p>
                        </div>

                        {/* avatar upload section */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <img src={authUser?.profilePic || selectedImage || avatar} alt="profile" className="w-24 h-24 rounded-full object-cover" />
                                <label htmlFor="avatat-upload"></label>
                            </div>
                            <input type="file" id="avatat-upload" accept='image/*' className="hidden" onChange={handleImageUpload}/>
                            <button className="btn btn-primary" onClick={()=>document.getElementById('avatat-upload').click()}>
                                <Camera className="size-4 mr-2" />
                                上传头像
                            </button>
                            <p className="text-sm text-gray-500">支持 jpg、png 格式，文件大小不超过 2MB</p>
                            {isUpdatingProfile && (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>更新中...</span>
                                </div>
                            )}
                        </div>
                        <div className="form-control">
                                <label htmlFor="fullName" className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" id="fullName" className="input input-bordered w-full" value={authUser?.fullName}  disabled/>
                            </div>
                            <div className="form-control">
                                <label htmlFor="email" className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" id="email"  className="input input-bordered w-full" value={authUser?.email}  disabled/>
                            </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}