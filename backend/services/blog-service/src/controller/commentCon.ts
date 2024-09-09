import { Request, Response } from "express";
import Post from "../model/postModel";


export const createComment = async (req: Request, res: Response) => {

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