import mongoose,{Schema,Document} from "mongoose";



 interface Iuser extends Document{
    username:string,
    email:string,
    password:string,
    createdAt:Date
 }


const userSchema: Schema=new Schema<Iuser>({

    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }


})


const User=mongoose.model<Iuser>('User',userSchema);

export default User