import amqp, { Channel, Connection } from 'amqplib'

let channel: Channel
let connection: Connection

export const connectRabbitMq = async () => {
    try {
        console.log('going to connect');
        
        connection = await amqp.connect('amqp://localhost')
        
        console.log('rabbitmq connected in the blogservice');
        channel = await connection.createChannel()


    } catch (error) {
        console.log('error in connecting to rabitmq in blogservice', error);

    }
}

export const getChannel = () => {
    if (!channel) {
        throw new Error('rabbitmq channel not initalized  blog service ')
    }
    return channel
}