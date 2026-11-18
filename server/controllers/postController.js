import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

// 1. Add Post
export const addPost = async (req, res) => {
  try {
    const { userId } = await req.auth();
    let { content, post_type } = req.body;
    const images = req.files;

    const hasContent = Boolean(content && content.trim());
    const hasImages = Boolean(images && images.length > 0);

    // Validation: Ensure post has either text content or at least one image
    if (!hasContent && !hasImages) {
      return res.json({
        success: false,
        message: "Post must contain text or at least one image",
      });
    }

    // Auto-assign post_type if not provided
    if (!post_type) {
      if (hasContent && hasImages) {
        post_type = "text_with_image";
      } else if (hasImages) {
        post_type = "image";
      } else {
        post_type = "text";
      }
    }

    let image_urls = [];

    if (hasImages) {
      image_urls = await Promise.all(
        images.map(async (image) => {
          const fileBuffer = fs.readFileSync(image.path);
          const response = await imagekit.upload({
            file: fileBuffer,
            fileName: image.originalname,
            folder: "posts",
          });

          const url = imagekit.url({
            path: response.filePath,
            transformation: [
              { quality: "auto" },
              { format: "webp" },
              { width: "1280" },
            ],
          });
          return url;
        })
      );
    }

    await Post.create({
      user: userId,
      content,
      image_urls,
      post_type,
    });

    res.json({ success: true, message: "Post created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// 2. Get Feed Posts
export const getFeedPosts = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // User connections and followings
    const userIds = [userId, ...user.connections, ...user.following];
    const posts = await Post.find({ user: { $in: userIds } })
      .populate("user")
      .sort({ createdAt: -1 });

    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 3. Like / Unlike Post
export const likePost = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { postId } = req.body;

    if (!postId) {
      return res.json({ success: false, message: "Post ID is required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.json({ success: false, message: "Post not found" });
    }

    if (post.likes_count.includes(userId)) {
      post.likes_count = post.likes_count.filter((user) => user !== userId);
      await post.save();
      res.json({ success: true, message: "Post unliked" });
    } else {
      post.likes_count.push(userId);
      await post.save();
      res.json({ success: true, message: "Post liked" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
