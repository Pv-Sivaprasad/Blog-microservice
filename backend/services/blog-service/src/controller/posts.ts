import Post from "../model/postModel";
import mongoose from "mongoose";
import { Request, Response } from "express";

export const allPosts = async (req: Request, res: Response) => {
    console.log('Fetching all posts');
    
    try {
        const allPosts = await Post.find({}, 'title content -_id');
        console.log('All posts:', allPosts);
        return res.json(allPosts);
    } catch (error) {
        console.log('Error in fetching all posts', error);
        return res.status(500).json({ message: 'Failed to fetch posts' });
    }
};


export const userPost = async (req: Request, res: Response) => {
    console.log('Fetching post by ID');
    
    const id = req.params.id;
    console.log('Requested ID:', id);

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid post ID format' });
    }

    try {
        // Fetch the post by ID and exclude _id
        const post = await Post.findById(id, 'title content -_id'); 
        console.log('Fetched post:', post);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.log('Error in fetching post by ID', error);
        return res.status(500).json({ message: 'Failed to fetch post' });
    }
};
