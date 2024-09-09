import { Router } from "express";
import { isLoggedIn } from "../middleware/auth";
import { createComment } from "../controller/commentCon";

const router=Router()



export default router



router.post('/createcomment',isLoggedIn,createComment)