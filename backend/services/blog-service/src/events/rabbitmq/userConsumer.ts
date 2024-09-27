import { getChannel } from "../../config/rabbitmq";
import User from "../../model/userModel";


const user_queue='user_queue'

export const recieveUserFromQueue = async()=>{

    try {
        
        let channel=getChannel()
        channel.assertQueue(user_queue,{durable:false})
        channel.consume(user_queue,async(msg:any)=>{
            if(msg){
                const messageContent=JSON.parse(msg.content.toString())
                console.log('the messagecontent is recived after consuming',messageContent);

                const newUser=new User({
                    _id:messageContent._id,
                    name:messageContent.name,
                    email:messageContent.email,
                    password:messageContent.password
                })    
                
                await newUser.save()
                channel.ack(msg)
            }
        },{noAck:false})
        console.log(`waiting for message in ${user_queue}`);
        
    } catch (error) {
        console.log('failed to receive message from q in usercinsumer blog-service',error);
        
    }

}