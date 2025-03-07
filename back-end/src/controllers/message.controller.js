import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId,io } from '../socket.js';
export const getUsers = async(req,res)=>{
    try{
        // 查询出除了自己之外的所有用户
        const loggledInUserId = req.user._id;
        // 获取所有用户除了自己，然后返回的数据中不要包含passWord
        const filteredUsers = await User.find({_id:{$ne:loggledInUserId}}).select('-passWord');
        res.status(200).json(filteredUsers);
    }catch(err){
        res.status(500).json({message:'network error'});
    }
};

export const getMessages = async(req,res)=>{
    try{
        // 通过params拿到我们与对方交谈的用户的id
        // 然后拿到我们自己的id
        // 在所有消息中查询出发送方是我，接收方是对方的message
        // 或者发送方是对方，接收方是我
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:userToChatId,receiverId:senderId},
                {senderId:senderId,receiverId:userToChatId},
            ]
        }).select('-passWord');
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json({message:'network error'});
    }
}

export const sendMessage = async(req,res)=>{
    try{
        const {text,image,userToChatId} = req.body;
        const senderId = req.user._id;

        let imgUrl = null;
        // 有图片的话就上传到云端，获取云端图片url
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image,{
                folder:'messages',
                transformation:{
                    width:500,
                    height:500,
                    crop:'limit',
                }
            });
            imgUrl = uploadResponse.secure_url;
        }
        const messageText = new Message({
            senderId,
            receiverId:userToChatId,
            text,
            image:imgUrl,
        });
        await messageText.save();

        const receiverSocketId = getReceiverSocketId(userToChatId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',messageText);
        }
        res.status(200).json({message:'message sent successfully'});
    }catch(err){
        res.status(500).json({message:'network error'});
    }
}