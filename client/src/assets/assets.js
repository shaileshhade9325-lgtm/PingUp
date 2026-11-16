import myprofile from './myprofile.jpeg'
import logo from './logo.svg'
import sample_cover from './sample_cover.jpg'
import sample_profile from './sample_profile.jpg'
import bgImage from './bgImage.png'
import group_users from './group_users.png'
import { Home, MessageCircle, Search, UserIcon, Users } from 'lucide-react'
import sponsored_img from './sponsored_img.png'

export const assets = {
    logo,
    sample_cover,
    sample_profile,
    bgImage,
    group_users,
    sponsored_img
}

export const menuItemsData = [
    { to: '/', label: 'Feed', Icon: Home },
    { to: '/messages', label: 'Messages', Icon: MessageCircle },
    { to: '/connections', label: 'Connections', Icon: Users },
    { to: '/discover', label: 'Discover', Icon: Search },
    { to: '/profile', label: 'Profile', Icon: UserIcon },
];

export const dummyUserData = {
    "_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
    "email": "admin@example.com",
    "full_name": "Shailesh Hade",
    "username": "Shailesh Hade",
    "bio": "🌍 Dreamer | 📚 Learner | 🚀 Doer\r\nExploring life one step at a time.\r\n✨ Staying curious. Creating with purpose.",
    "profile_picture": myprofile,
    "cover_photo": sample_cover,
    "location": "New York, NY",
    "followers": ["user_2", "user_3", "user_4", "user_5"],
    "following": ["user_2", "user_3", "user_4"],
    "connections": ["user_2", "user_3", "user_4"],
    "posts": [],
    "is_verified": true,
    "createdAt": "2025-07-09T09:26:59.231Z",
    "updatedAt": "2025-07-21T06:56:50.017Z",
}

const dummyUser2Data = {
    ...dummyUserData,
    _id: "user_2",
    username: "richard_h",
    full_name: "Richard Hendricks",
    bio: "Compression fanatic. Pied Piper CEO. 💻",
    profile_picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
}

const dummyUser3Data = {
    ...dummyUserData,
    _id: "user_3",
    username: "alexa_james",
    full_name: "Alexa James",
    bio: "Design lead & coffee lover ☕. Building clean user interfaces.",
    profile_picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
}

const dummyUser4Data = {
    ...dummyUserData,
    _id: "user_4",
    username: "sarah_connor",
    full_name: "Sarah Connor",
    bio: "Cybersecurity analyst 🛡️ | Tech writer | Sci-fi enthusiast.",
    profile_picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
}

const dummyUser5Data = {
    ...dummyUserData,
    _id: "user_5",
    username: "marcus_vance",
    full_name: "Marcus Vance",
    bio: "Full-stack developer & open-source contributor ⚡",
    profile_picture: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&h=200&auto=format&fit=crop",
}

export const dummyStoriesData = [
    {
        "_id": "68833d466e4b42b685068860",
        "user": dummyUserData,
        "content": "📌 This isn't the story I wanted to tell… not yet. But if you're reading this, know that something interesting is in motion 🔄.",
        "media_url": "",
        "media_type": "text",
        "background_color": "#4f46e5",
        "createdAt": new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        "updatedAt": new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        "_id": "688340046e4b42b685068a73",
        "user": dummyUser2Data,
        "content": "",
        "media_url": "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
        "media_type": "image",
        "background_color": "#4f46e5",
        "createdAt": new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        "updatedAt": new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
        "_id": "68833fe96e4b42b685068a5e",
        "user": dummyUser3Data,
        "content": "",
        "media_url": "https://videos.pexels.com/video-files/14447442/14447442-hd_1080_1920_30fps.mp4",
        "media_type": "video",
        "background_color": "#4f46e5",
        "createdAt": new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        "updatedAt": new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        "_id": "68833e136e4b42b685068937",
        "user": dummyUser4Data,
        "content": "Working on a new security audit framework today! 🔒",
        "media_url": "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg",
        "media_type": "image",
        "background_color": "#0ea5e9",
        "createdAt": new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        "updatedAt": new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
]

export const dummyPostsData = [
    {
        "_id": "68773e977db16954a783839c",
        "user": dummyUserData,
        "content": "We're a small #team with a big vision — working day and night to turn dreams into products, and #products into something people love.",
        "image_urls": [
            "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
        ],
        "post_type": "text_with_image",
        "likes_count": ["user_2", "user_4"],
        "createdAt": "2025-07-16T05:54:31.191Z",
        "updatedAt": "2025-07-16T05:54:31.191Z",
    },
    {
        "_id": "686e6d0407845749500c24cd",
        "user": dummyUser2Data,
        "content": "Unlock your potential—every small step counts. Stay consistent, stay focused, and trust the process. 🌱✨ #GrowthMindset",
        "image_urls": [],
        "post_type": "text",
        "likes_count": ["user_3"],
        "createdAt": "2025-07-09T13:22:12.601Z",
        "updatedAt": "2025-07-09T13:22:12.601Z",
    },
    {
        "_id": "686e6b21de877d29cf02e2a7",
        "user": dummyUser3Data,
        "content": "Just deployed our new design system components. Clean code is art! 🎨✨ #UIDesign #WebDev",
        "image_urls": [],
        "post_type": "text",
        "likes_count": ["user_2", "user_5"],
        "createdAt": "2025-07-09T13:14:09.144Z",
        "updatedAt": "2025-07-09T13:14:09.144Z",
    },
    {
        "_id": "686e39e86e0585e9e2e58dd3",
        "user": dummyUser4Data,
        "content": "Finally got the new setup running smoothly! 🖥️🚀",
        "image_urls": [
            "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
        ],
        "post_type": "text_with_image",
        "likes_count": ["user_2", "user_3", "user_5"],
        "createdAt": "2025-07-09T09:44:08.626Z",
        "updatedAt": "2025-07-09T09:44:08.626Z",
    }
]

export const dummyRecentMessagesData = [
    {
        "_id": "68833af618623d2de81b5381",
        "from_user_id": dummyUser2Data,
        "to_user_id": dummyUserData,
        "text": "I saw your profile, looks great!",
        "message_type": "text",
        "media_url": "",
        "seen": true,
        "createdAt": "2025-07-25T08:06:14.436Z",
        "updatedAt": "2025-07-25T08:47:47.768Z",
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": dummyUserData,
        "to_user_id": dummyUser3Data,
        "text": "Check out this new tablet design.",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T08:07:11.893Z",
        "seen": true
    },
    {
        "_id": "686fb66c7f0dcbff63b239e7",
        "from_user_id": dummyUser4Data,
        "to_user_id": dummyUserData,
        "text": "Hey Shailesh, are we still meeting for the code review?",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-10T12:47:40.510Z",
        "updatedAt": "2025-07-10T12:47:40.510Z",
        "seen": false
    }
]

export const dummyMessagesData = [
    {
        "_id": "6878cc3217a54e4d37480122",
        "from_user_id": "user_2",
        "to_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "text": "",
        "message_type": "image",
        "media_url": "https://images.pexels.com/photos/106341/pexels-photo-106341.jpeg",
        "createdAt": "2025-07-17T10:10:58.524Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": "user_2",
        "to_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "text": "This is a Samsung Tablet",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "68835ffc6e4b42b685069def",
        "from_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "to_user_id": "user_2",
        "text": "Yeah, this tablet is good.",
        "message_type": "text",
        "media_url": "",
        "seen": false,
        "createdAt": "2025-07-25T10:44:12.753Z",
        "updatedAt": "2025-07-25T10:44:12.753Z",
    },
    {
        "_id": "6878cc2817a54e4d3748010c",
        "from_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "to_user_id": "user_2",
        "text": "You can purchase it from Amazon.",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-08-17T10:10:48.956Z",
        "updatedAt": "2025-08-25T10:43:50.346Z",
        "seen": true
    }
]

export const dummyConnectionsData = [
    dummyUserData,
    dummyUser2Data,
    dummyUser3Data,
    dummyUser4Data,
    dummyUser5Data
]

export const dummyFollowersData = [
    dummyUser2Data,
    dummyUser3Data,
    dummyUser4Data,
    dummyUser5Data
]

export const dummyFollowingData = [
    dummyUser2Data,
    dummyUser3Data,
    dummyUser4Data
    
]

export const dummyPendingConnectionsData = [
    dummyUserData,
    dummyUser5Data
]