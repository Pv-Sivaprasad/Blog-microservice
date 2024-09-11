import { Router } from "express";
import { isLoggedIn } from "../middleware/auth";
import { createComment,editComment,deleteComment} from "../controller/comments";

const router=Router()


router.post('/createcomment/:postId',isLoggedIn,createComment)
router.patch('/editcomment/:commentId',isLoggedIn,editComment)
router.delete('/deletecomment/:commentId',isLoggedIn,deleteComment)


export default router