import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from'dotenv'

dotenv.config()

export const isLoggedIn= async(req:Request,res:Response,next:NextFunction) =>{

    console.log('started from here');
     
    
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        
        console.log(token,'==================================');
        
        
        if (!token) {
            return res.status(401).json({ error: 'Access denied, no token provided' });
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            console.log(decoded,'[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
            
            (req as any).user = decoded;
            next();
        } catch (err) {
            console.error('JWT Verification Error:',err);
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        
    } catch (error) {
        console.error('Middleware Error:',error);
        return res.status(500).json({ error: 'Server error' });
    }
    

}

