import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { inngest, functions } from './inngest/index.js';
import { serve } from 'inngest/express';

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

// Inngest webhook endpoint
app.use('/api/inngest', serve({ client: inngest, functions }));

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
