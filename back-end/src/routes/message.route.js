import express from 'express';
const router = express.Router();
import {protectRoute} from '../middleware/auth.middleware.js';
import {getUsers,getMessages,sendMessage} from '../controllers/message.controller.js';


router.get('/users',protectRoute,getUsers);
router.get('/:id',protectRoute,getMessages);
router.post('/send',protectRoute,sendMessage);
export default router;