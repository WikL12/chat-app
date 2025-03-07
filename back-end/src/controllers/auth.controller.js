
import User from '../models/user.model.js';
import { generateJwtToken } from '../lib/util.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';
export const signup = async (req, res) => {
    const { email, fullName, passWord } = req.body;
    try {
        if (passWord.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        // 检查是否已经注册
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // 注册新用户
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passWord, salt);
        const newUser = new User({ email, fullName, passWord: hashedPassword });
        if (newUser) {
            generateJwtToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'network error' });
    }
};

export const login = async (req, res) => {
    // 检查用户输入的email，然后测试是否与密码匹配
    const { email, passWord } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(passWord, user.passWord);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        generateJwtToken(user._id, res);
        res.status(200).json({
            data: {
                fullName: user.fullName,
                email: user.email,
                passWord: user.passWord,
                id: user._id,
            },
            message: 'Login successfully'
        });
    } catch (error) {
        res.status(500).json('network error');
    }
};
export const logout = (req, res) => {
    // 清除cokkies
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ message: 'Logout successfully' });
    } catch (error) {
        res.status(500).json({ message: 'network error' });
    }
};


export const update = async (req, res) => {
    // 传入图片到cloudnary云上面
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        if (!profilePic) {
            return res.status(400).json({ message: 'Profile picture is required' });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: 'profilePics',
            transformation: {
                width: 500,
                height: 500,
            }
        });

        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePic: uploadResponse.secure_url,
        }, { new: true });
        console.log(updatedUser);
        res.status(200).json('upload pic successfully');

    } catch (error) {
        res.status(500).json({ message: 'network error' });
    }
}


export const check = async(req,res)=>{
    // 讲middleware中的req中的user信息返回，如果能够返回，则说明通过了middleware中的jwt鉴权
    try{
        res.status(200).json(req.user);
    }catch(err){
        res.status(500).json({message:'you didnt through auth check'});
    }
}