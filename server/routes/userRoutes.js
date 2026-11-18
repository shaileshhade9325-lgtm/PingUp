import express from 'express';
import { protect } from '../middlewares/auth.js';
import {
  getUserData,
  updateUserData,
  discoverUsers,
  followUser,
  unfollowUser,
  sendConnectionRequest,
  getUserConnections,
  acceptConnectionRequest,
  getUserProfiles
} from '../controllers/userController.js';
import { upload } from '../configs/multer.js';
import { getUserRecentMessages } from '../controllers/messageController.js';

const userRouter = express.Router();

// Existing User Routes
userRouter.get('/data', protect, getUserData);
userRouter.post('/update', upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), protect, updateUserData);
userRouter.post('/discover', protect, discoverUsers);
userRouter.post('/follow', protect, followUser);
userRouter.post('/unfollow', protect, unfollowUser);

// Connection Routes
userRouter.post('/connect', protect, sendConnectionRequest);
userRouter.post('/accept', protect, acceptConnectionRequest);
userRouter.get('/connections', protect, getUserConnections);

// Profile Route
userRouter.post('/profiles', getUserProfiles);
userRouter.get('/recent-messages', protect, getUserRecentMessages);
export default userRouter;
