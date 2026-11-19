import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Loading from '../components/Loading';
import StoriesBar from '../components/StoriesBar';
import PostCard from '../components/PostCard';
import RecentMessages from '../components/RecentMessages';
import { useAuth } from '@clerk/react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/post/feed', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setFeeds(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-10'>
      {/* Left / Center Column: Stories & Posts */}
      <div>
        <StoriesBar />
        <div className='p-4 space-y-6'>
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar: Sponsored & Recent Messages */}
      <div className='max-xl:hidden sticky top-0 space-y-6 w-80'>
        {/* Sponsored Section */}
        <div className='w-full bg-white text-xs p-4 rounded-xl flex flex-col gap-2.5 shadow'>
          <h3 className='text-slate-800 font-semibold text-sm'>Sponsored</h3>
          <img
            src={assets?.sponsored_img || 'https://unsplash.com'}
            className='w-full h-44 object-cover rounded-lg'
            alt='Sponsored'
          />
          <p className='text-slate-700 font-medium'>Email marketing</p>
          <p className='text-slate-400 leading-relaxed'>
            Supercharge your marketing with a powerful, easy-to-use platform built for results.
          </p>
        </div>

        {/* Recent Messages */}
        <RecentMessages />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
