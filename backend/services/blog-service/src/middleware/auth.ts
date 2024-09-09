import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from'dotenv'

dotenv.config()

export const isLoggedIn= async(req:Request,res:Response,next:NextFunction) =>{

    console.log('started from here');
    
    // try {

    //     const token = req.header('Authorization')?.split(' ')[1];
    //         console.log(token,'aksdfjkahsdfajhfkadjsfk');
            
    //     if(!token) return res.status(401).json({error:'Access denied ,not valid'})
    //         console.log('the secret', process.env.JWT_SECRET);
            
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET as string);    
    //             console.log(decoded,'asdkfhgdfghiusfhjsfb');
                
    //         (req as any).user = decoded;
    //         console.log('forwarded from here');
            
    //         next()



    // } catch (error) {
    //     return res.status(401).json({error:'Invalid or expired token'})
    // }
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        console.log(token, 'Token received');
        
        if (!token) {
            return res.status(401).json({ error: 'Access denied, no token provided' });
        }
        
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            console.log('Decoded:', decoded);
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

