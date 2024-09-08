import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import User from "../model/userModel";
dotenv.config(); 


export const isLogged=async(req:Request,res:Response,next:NextFunction) =>{
   console.log('reached here');
   
    try {
        
        const token = req.header('Authorization')?.split(' ')[1];
        
        
        if(!token) return res.status(401).json({message:'Access Denied no authorization'})

            const decoded =jwt.verify(token,process.env.JWT_SECRET as string) as {id:string}
        

        const user =await User.findById(decoded.id)
       
        

        if(!user)  return res.status(404).json({ error: 'User not found' });

            (req as any).user=user;
            next()


    } catch (error) {
        console.log('error in token verification');
        res.status(401).json({error:'Invalid or expired '})
        
    }
}

