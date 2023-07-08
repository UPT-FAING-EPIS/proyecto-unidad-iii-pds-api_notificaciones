const NotificationFactory = require('./notificationFactory');
const RabbitMQConsumer = require('./rabbitmqConsumer');
const RabbitMQPublisher = require('./rabbitmqPublisher');
const EmailNotificationStrategy = require('./emailNotificationStrategy');

// Crea la fábrica de notificaciones
const notificationFactory = new NotificationFactory();

// Registra las estrategias de notificación
notificationFactory.registerStrategy('email', new EmailNotificationStrategy());

// Crea el consumidor de RabbitMQ y pásale la fábrica de notificaciones
const rabbitMQConsumer = new RabbitMQConsumer(notificationFactory);

// Crea el publicador de RabbitMQ
const rabbitMQPublisher = new RabbitMQPublisher();

// Inicia la conexión de RabbitMQ y consume mensajes
rabbitMQConsumer.connectAndConsume('amqps://enozynwv:2TtZL4ta8m_64qXMTbYs2SjVjRbPL8av@cow.rmq2.cloudamqp.com/enozynwv', 'hello');

// Publica mensajes en RabbitMQ
rabbitMQPublisher.connectAndPublish('amqps://enozynwv:2TtZL4ta8m_64qXMTbYs2SjVjRbPL8av@cow.rmq2.cloudamqp.com/enozynwv', 'hello');