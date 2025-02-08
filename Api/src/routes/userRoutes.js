import express from 'express';
import { getUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/userController'; 
import { authUser } from '../utils/authMiddleware';

const router = express.Router();

router.get('/profile', authUser, getUserProfile);
router.put('/profile', authUser, updateUserProfile);
router.delete('/profile', authUser, deleteUserProfile);

export default router;