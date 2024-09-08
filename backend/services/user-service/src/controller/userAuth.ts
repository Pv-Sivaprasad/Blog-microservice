import { Request,Response } from "express";
import bcrypt from 'bcryptjs'
import User from "../model/userModel";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';


dotenv.config(); 

const SALT_ROUNDS=10

export const signup=async(req:Request,res:Response): Promise<Response> => {

    const {username,email,password }=req.body

    try {
        
        const exsistingUser=await User.findOne({email})
        if(exsistingUser){
            return res.status(404).json({message:'user already exists'})
        }
        const hashedPassword=await bcrypt.hash(password,SALT_ROUNDS)

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })

            await newUser.save()

            return res.status(200).json({
                message:'user created succesfully',
                user:{
                    id:newUser._id,
                    user:newUser.username,
                    email:newUser.email
                }
            })
    //  saaaaaaaaaaaaaaaaa
    } catch (error) {
        console.log('error in signup of user');
        return res.status(500).json({message:'internal server error'})
        
    }

}


export const signin =async(req:Request,res:Response):Promise<Response> =>{

    const {email,password}=req.body

    try {
        const exsistingUser=await User.findOne({email})
        if(!exsistingUser) return res.status(404).json({message:'user not found'}) 
            
            const isPassword=await bcrypt.compare(password,exsistingUser.password)
            if(!isPassword) return res.status(404).json({message:'Invalid email or password'}) 

                const token=jwt.sign({id:exsistingUser._id,email:exsistingUser.email},
                    process.env.JWT_SECRET as string,
                    {expiresIn:'1h'})

                    return res.status(200).json({token,user:exsistingUser})


    } catch (error) {
        console.log('error in signin ',error);
        return res.status(500).json({message:'internal server error'})
    }
}


