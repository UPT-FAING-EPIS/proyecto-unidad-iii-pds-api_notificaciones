const { getChannel } = require('../rabbitmq');

const enviarMensajeRabbitMQ = async (queueName, message) => {
  try {
    const channel = await getChannel();
    channel.assertQueue(queueName, { durable: false }, (error, _) => {
      if (error) {
        console.error('Error al crear la cola en RabbitMQ:', error);
        return;
      }
      channel.sendToQueue(queueName, Buffer.from(message));
      console.log('Mensaje enviado a RabbitMQ:', message);
    });
  } catch (error) {
    console.error('Error al obtener el canal de RabbitMQ:', error);
    throw new Error('Error al obtener el canal de RabbitMQ');
  }
};

module.exports = {
  enviarMensajeRabbitMQ
};