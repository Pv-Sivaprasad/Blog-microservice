import { Request, Response } from "express";
import Post from "../model/postModel";


export const createPost = async (req: Request, res: Response) => {

    try {

        const { title, content } = req.body
        const authorId = (req as any).user.id

        const newPost = new Post({
            title,
            author: authorId,
            content
        })

        await newPost.save()

        return res.json(newPost)

    } catch (error) {
        console.log('error in creating', error)

    }
}


export const updatePost = async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const { title, content } = req.body
        const authorId = (req as any).user.id
        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ error: 'post not found' })

        if (post?.author.toString() !== authorId) {
            return res.json({ message: 'you are unauthorized' })
        }

        const update = await Post.findByIdAndUpdate(id, { title, content })
        console.log(update);

        return res.status(200).json({ message: 'updated successfully' })
    } catch (error) {
        console.log('error in updating the post', error);

    }

}



export const deletePost = async (req: Request, res: Response) => {

    console.log('rekajdfyhuiasgfjkasgf');
    

    const id = req.params.id
    console.log(id,'][][][][');
    
    const authorId = (req as any).user.id

    try {

        const post = await Post.findById(id)

        if (!post) return res.status(404).json({ error: 'post not found' })

            if(post.author.toString()!==authorId){
                return res.json({message:"you are unauthorized"})
            }

            await Post.findByIdAndDelete(id)
            return res.status(200).json({message:'post deleted successfully'})


    } catch (error) {
        console.log('error in deleting post',error);
        
    }
}