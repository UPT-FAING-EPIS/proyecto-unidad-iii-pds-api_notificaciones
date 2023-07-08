const amqp = require('amqplib/callback_api');

let connection;
let channel;

const connectToRabbitMQ = async () => {
  try {
    connection = await new Promise((resolve, reject) => {
      amqp.connect('amqps://fioyqbtx:u2eSjzIKcYeW1u4eB9VsdcInAatSYCXe@prawn.rmq.cloudamqp.com/fioyqbtx', (error, conn) => {
        if (error) {
          reject(error);
        } else {
          resolve(conn);
        }
      });
    });
    
    channel = await connection.createChannel();
    
    console.log('Conexión establecida con RabbitMQ');
  } catch (error) {
    console.error('Error al conectarse a RabbitMQ:', error);
  }
};

const getConnection = () => connection;
const getChannel = () => channel;

module.exports = {
  connectToRabbitMQ,
  getConnection,
  getChannel,
};
