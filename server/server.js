import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import User from './models/User.js';
import userRouter from './routes/userRoutes.js';

const app = express();

await connectDB();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send('Server is running'));

// Direct User Sync Endpoint (Saves Clerk user to MongoDB on login)
app.post('/api/user/sync', async (req, res) => {
  try {
    const { id, email, full_name, profile_picture } = req.body;

    if (!id || !email) {
      return res
        .status(400)
        .json({ success: false, message: 'User ID and email are required' });
    }

    let username = email.split('@')[0];
    const existingUsername = await User.findOne({ username, _id: { $ne: id } });
    if (existingUsername) {
      username = username + Math.floor(Math.random() * 10000);
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          email,
          full_name: full_name || 'New User',
          profile_picture: profile_picture || '',
        },
        $setOnInsert: {
          _id: id,
          username,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('User sync error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// User Feature Routes
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
