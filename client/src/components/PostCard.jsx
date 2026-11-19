import React, { useState } from 'react';
import { BadgeCheck, Heart, MessageCircle, Send, Share2, Trash2 } from 'lucide-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '@clerk/react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const PostCard = ({ post }) => {
  const postWithHashtags = (post.content || '').replace(
    /(#\w+)/g,
    '<span class="text-indigo-600">$1</span>'
  );
  const [likes, setLikes] = useState(post.likes_count || []);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  const currentUser = useSelector((state) => state.user.value);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      const { data } = await api.post(
        '/api/post/like',
        { postId: post._id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setLikes((prev) => {
          if (prev.includes(currentUser._id)) {
            return prev.filter((id) => id !== currentUser._id);
          } else {
            return [...prev, currentUser._id];
          }
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setComments([
      ...comments,
      {
        _id: Date.now().toString(),
        user: currentUser,
        text: commentText.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setCommentText('');
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment._id !== commentId));
  };

  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>
      {/* User Info */}
      <div
        onClick={() => navigate('/profile/' + post.user._id)}
        className='inline-flex items-center gap-3 cursor-pointer'
      >
        <img
          src={post.user.profile_picture}
          alt=''
          className='w-10 h-10 rounded-full shadow object-cover'
        />
        <div>
          <div className='flex items-center space-x-1'>
            <span>{post.user.full_name}</span>
            <BadgeCheck className='w-4 h-4 text-blue-500' />
          </div>
          <div className='text-gray-500 text-sm'>
            @{post.user.username} • {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <div
          className='text-gray-800 text-sm whitespace-pre-line'
          dangerouslySetInnerHTML={{ __html: postWithHashtags }}
        />
      )}

      {/* Images */}
      {post.image_urls?.length > 0 && (
        <div className='grid grid-cols-2 gap-2'>
          {post.image_urls.map((img, index) => (
            <img
              src={img}
              key={index}
              className={`w-full h-48 object-cover rounded-lg ${
                post.image_urls.length === 1 && 'col-span-2 h-auto'
              }`}
              alt=''
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className='flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>
        <div className='flex items-center gap-1'>
          <Heart
            className={`w-4 h-4 cursor-pointer ${
              likes.includes(currentUser?._id) && 'text-red-500 fill-red-500'
            }`}
            onClick={handleLike}
          />
          <span>{likes.length}</span>
        </div>

        <div
          onClick={() => setShowComments(!showComments)}
          className='flex items-center gap-1 cursor-pointer hover:text-indigo-600'
        >
          <MessageCircle className='w-4 h-4' />
          <span>{comments.length}</span>
        </div>

        <div className='flex items-center gap-1'>
          <Share2 className='w-4 h-4' />
          <span>{7}</span>
        </div>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className='pt-3 border-t border-gray-200 space-y-3'>
          <form onSubmit={handleAddComment} className='flex items-center gap-2'>
            <input
              type='text'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder='Write a comment...'
              className='flex-1 bg-slate-100 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            />
            <button
              type='submit'
              className='p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 cursor-pointer'
            >
              <Send className='w-4 h-4' />
            </button>
          </form>

          <div className='space-y-2 max-h-48 overflow-y-auto no-scrollbar'>
            {comments.map((comment) => (
              <div
                key={comment._id}
                className='flex items-start gap-2 text-sm bg-slate-50 p-2.5 rounded-lg'
              >
                <img
                  src={comment.user.profile_picture}
                  alt=''
                  className='w-7 h-7 rounded-full object-cover mt-0.5'
                />
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <span className='font-medium text-slate-800 text-xs'>
                      {comment.user.full_name}
                    </span>
                    <div className='flex items-center gap-2'>
                      <span className='text-[10px] text-slate-400'>
                        {moment(comment.createdAt).fromNow()}
                      </span>
                      {comment.user._id === currentUser?._id && (
                        <button
                          type='button'
                          onClick={() => handleDeleteComment(comment._id)}
                          title='Delete comment'
                          className='text-slate-400 hover:text-red-500 cursor-pointer transition'
                        >
                          <Trash2 className='w-3.5 h-3.5' />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className='text-slate-700 text-xs mt-0.5'>
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
