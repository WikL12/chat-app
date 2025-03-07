import { useState } from "react"
import { useRef } from "react"
import { useChatStore } from "../store/useChatStore"
import { X,Image, Send } from "lucide-react"
export default function MessageInput(){
    const [text , setText] = useState('');
    const [imagePreview,setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const {sendMessage,selectedUser} = useChatStore()
    const handleImageUpload = (e)=>{
        const file = e.target.files[0]
        if(file){
            setImagePreview(URL.createObjectURL(file))
        }
        const reader = new FileReader();
        reader.onload = (e)=>{
            setImagePreview(e.target.result)
        }
        reader.readAsDataURL(file)
    }
    const removeImage = ()=>{
        setImagePreview(null)
        fileInputRef.current.value = null
    }
    const handleSendMessage = async(e)=>{
        e.preventDefault()
        if(!text.trim() && !imagePreview){
            return
        }
        try{
            await sendMessage({
                text:text.trim(),
                image:imagePreview,
                userToChatId:selectedUser._id
            })
            setText('')
            setImagePreview(null)
        fileInputRef.current.value = null

        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img src={imagePreview} alt="image" className="w-10 h-10 rounded-full object-cover" />
                        <button className="absolute top-0 right-0" onClick={removeImage}>
                            <X className="size-4" />
                        </button>
                    </div>

                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input type="text" 
                    className="w-full input input-bordered rounded-lg input-sm sm:input-md "
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    />
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                    <button type="button" className="btn btn-sm btn-circle btn-ghost" onClick={()=>fileInputRef.current.click()}><Image size={20}/></button>
                </div>
                <button type="button" className="btn btn-sm btn-circle btn-ghost" onClick={handleSendMessage}><Send size={20}/></button>

            </form>
        </div>
    )
}   