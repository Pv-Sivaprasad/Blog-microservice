import amqp,{Channel,Connection} from 'amqplib'


let channel:Channel
let connection:Connection


export const connectRabbitMQ=async()=>{
    console.log('reached here=============');
    
    try {
        
        connection=await amqp.connect('amqp://localhost')
        console.log('rabitmq has been connected');
        
        channel=await connection.createChannel()
    } catch (error) {
        console.log('failed to connect to  user service rabbit mq ',error);
        
    }
}

export const getChannel=()=> channel