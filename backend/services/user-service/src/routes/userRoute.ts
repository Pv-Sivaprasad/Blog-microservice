import { Router } from "express";
import { signin, signup } from "../controller/userAuth";
import { isLogged } from "../middleware/auth";
import { getProfile } from "../controller/profile";


const router=Router()


router.post('/signup',signup)
router.post('/signin',signin)
router.get('/profile',isLogged,getProfile)




export default router