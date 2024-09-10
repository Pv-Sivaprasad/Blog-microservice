import { Router } from "express";
import { isLoggedIn } from "../middleware/auth";
import { createPost, deletePost, updatePost } from "../controller/createPost";
import { allPosts,userPost } from "../controller/posts";




const router=Router()

 
export default router



router.post('/createpost',isLoggedIn,createPost)
router.get('/posts',allPosts)
router.get('/posts/:id', userPost);
router.put('/updatepost/:id',isLoggedIn,updatePost)
router.delete('/deletepost/:id',isLoggedIn,deletePost)