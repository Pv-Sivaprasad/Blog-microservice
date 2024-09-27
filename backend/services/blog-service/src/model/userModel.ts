import mongoose,{Document,Schema} from "mongoose";

interface Iuser extends Document{
    _id:mongoose.Types.ObjectId,
    name:string,
    email:string,
    password:string
}


const userSchema= new Schema<Iuser>({
    
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        // required:true,
    },
    password:{
        type:String,
        required:true
    }
})


const User=mongoose.model<Iuser>('User',userSchema)

export default User