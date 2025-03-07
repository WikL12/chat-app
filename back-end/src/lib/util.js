// 生成jwt鉴权token,并注册到浏览器cookie中 过期时间为30天
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generateJwtToken = (userId,res)=>{
   const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'30d'});
   res.cookie('jwt',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV !== 'development',
    maxAge:30*24*60*60*1000,
   })
}