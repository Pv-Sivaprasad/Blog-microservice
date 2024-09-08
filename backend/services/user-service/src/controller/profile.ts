import { Request,Response } from "express";
import User from '../model/userModel'

export const getProfile=async(req:any,res:Response) : Promise<Response> =>{
 
   
    const user=await User.findById(req.user.id)

    
   
    // aaaaaaaaaaaaaaaaaaaaa
    if(user) return res.status(200).json(user)

        return res.status(404).json({error:'user not found'})

}