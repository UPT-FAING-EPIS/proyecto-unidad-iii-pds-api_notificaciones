const amqp = require('amqplib');

class RabbitMQPublisher {
  connectAndPublish(connectionURL, queue) {
    amqp.connect(connectionURL)
      .then((connection) => {
        return connection.createChannel()
          .then((channel) => {
            return channel.assertQueue(queue)
              .then(() => {
                const message = {
                  id: Math.random().toString(32).slice(2, 6),
                  text: 'Api de Notificaciones'
                };

                const sent = channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
                if (sent) {
                  console.log(`Mensaje enviado a la cola "${queue}"`, message);
                } else {
                  console.log(`Error al enviar el mensaje a la cola "${queue}"`, message);
                }

                return channel.close();
              });
          })
          .then(() => connection.close());
      })
      .catch((error) => {
        console.error('Error de conexión con RabbitMQ:', error);
      });
  }
}

module.exports = RabbitMQPublisher;