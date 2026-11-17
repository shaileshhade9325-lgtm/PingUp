import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import User from './models/User.js';

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB safely before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.get('/', (req, res) => res.send('Server is running'));

// Direct User Sync Endpoint (Replaces Inngest webhook)
app.post('/api/user/sync', async (req, res) => {
  try {
    const { id, email, full_name, profile_picture } = req.body;

    if (!id || !email) {
      return res.status(400).json({ success: false, message: 'User ID and email are required' });
    }

    // Check if user already exists in MongoDB
    let user = await User.findById(id);

    if (!user) {
      // Generate a unique username from the email
      let username = email.split('@')[0];
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        username = username + Math.floor(Math.random() * 10000);
      }

      user = await User.create({
        _id: id,
        email,
        full_name: full_name || 'New User',
        profile_picture: profile_picture || '',
        username,
      });
    } else {
      // Update existing user details
      user = await User.findByIdAndUpdate(
        id,
        {
          email,
          full_name: full_name || user.full_name,
          profile_picture: profile_picture || user.profile_picture,
        },
        { new: true }
      );
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('User sync error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
