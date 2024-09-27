import { getChannel } from "../../config/rabbitmq";

let user_queue='user_queue'

const sendUserToQueue=async(msg:any)=>{
    try {
        
        let channel=getChannel()
        await channel.assertQueue(user_queue,{durable:false})
        const data= JSON.stringify(msg)
        channel.sendToQueue(user_queue,Buffer.from(data))
        console.log('data in userpubliser.ts is',data);
        
    } catch (error) {
        console.log('error sending message to queue',error);
        
    }
}

export default sendUserToQueue