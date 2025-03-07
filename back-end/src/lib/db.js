import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
   const conn =  await mongoose.connect(process.env.MONFGODB_URI);
    console.log('Connected to MongoDB'+`${conn.connection.host}`);
    }catch(err){
        console.log('Connected to MongoDB on error!:'+err);
    }
};

