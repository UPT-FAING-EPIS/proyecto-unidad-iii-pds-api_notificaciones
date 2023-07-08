const amqp = require('amqplib');

class RabbitMQConsumer {
  constructor(notificationFactory) {
    this.notificationFactory = notificationFactory;
  }

  connectAndConsume(connectionURL, queue) {
    amqp.connect(connectionURL)
      .then((connection) => connection.createChannel())
      .then((channel) => {
        return channel.assertQueue(queue, { durable: false }) // Ajusta el valor del atributo "durable" según corresponda
          .then(() => {
            console.log('Esperando mensajes...');
            
            return channel.consume(queue, (msg) => {
              const emailContent = msg.content.toString();
              const strategy = this.notificationFactory.createNotification('email');
              strategy.sendNotification('caraguilarso@upt.pe', 'Api de Notificaciones', emailContent);
              channel.ack(msg);
            });
          });
      })
      .catch((error) => {
        console.error('Error de conexión con RabbitMQ:', error);
      });
  }
}

module.exports = RabbitMQConsumer;
