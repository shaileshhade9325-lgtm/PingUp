import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Feed from './pages/Feed';
import Messages from './pages/Messages';
import ChatBox from './pages/ChatBox';
import Connections from './pages/Connections';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Layout from './pages/Layout';

const App = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncAndLogToken = async () => {
      if (!isLoaded || !isSignedIn || !user) return;

      const token = await getToken();
      console.log('Clerk Token:', token);

      const email =
        user.primaryEmailAddress?.emailAddress ||
        (user.emailAddresses && user.emailAddresses.at(0)?.emailAddress);

      if (!email) return;

      try {
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

        const response = await axios.post(`${backendUrl}/api/user/sync`, {
          id: user.id,
          email,
          full_name: user.fullName || user.firstName || 'New User',
          profile_picture: user.imageUrl || '',
        });

        console.log('User synced to MongoDB:', response.data);
      } catch (error) {
        console.error(
          'Failed to sync user to MongoDB:',
          error.response?.data || error.message
        );
      }
    };

    syncAndLogToken();
  }, [isLoaded, isSignedIn, user, getToken]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:userId" element={<ChatBox />} />
          <Route path="connections" element={<Connections />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:profileId" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
