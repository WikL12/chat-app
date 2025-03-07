import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();
import path from 'path';
import {app , server ,io} from './socket.js';
const port = process.env.PORT;

const __dirname = path.resolve();


app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use(cookieParser());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../font-end','dist')));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'../font-end','dist','index.html'));
    });
}

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});

