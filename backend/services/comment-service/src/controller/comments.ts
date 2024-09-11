import { Request, Response } from "express";
import Comment from "../model/commentModel";
import { error } from "console";



export const createComment = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;
        const { content } = req.body;
        const userId = (req as any).user.id;

        const comment = new Comment({
            postId,
            userId,
            content
        });

        let save = await comment.save();
        res.status(200).json({ message: 'Comment created successfully' });

    } catch (error) {
        console.log('Error in creating a comment', error);
        res.status(500).json({ message: 'Error creating comment', error });
    }
};


export const editComment = async (req: Request, res: Response) => {

    try {

        const commentId = req.params.commentId

        const { content } = req.body

        const comment = await Comment.findById(commentId)

        if (!comment) return res.status(404).json({ message: 'comment not found' })

        const userId = (req as any).user.id

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this comment' });
        }

        comment.content = content
        await comment.save()

        return res.status(200).json({ message: 'comment updated successfully' })

    } catch (error) {
        console.log('error in updating the comment', error);

    }

}


export const deleteComment =async(req:Request,res:Response) =>{
    try {
        
        const commentId=req.params.commentId
        const userId=(req as any).user.id

        await Comment.findByIdAndDelete(commentId)

        return res.status(200).json({message:'comment deleted successfully'})

    } catch (error) {
        console.log('error in deleting the comment',error);
        
    }
}
