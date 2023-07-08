const amqp = require('amqplib/callback_api');

class RabbitMQConnection {
  constructor(url) {
    this.url = url;
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    try {
      this.connection = await new Promise((resolve, reject) => {
        amqp.connect(this.url, (error, conn) => {
          if (error) {
            reject(error);
          } else {
            resolve(conn);
          }
        });
      });
      
      this.channel = await this.connection.createChannel();

      this.setupConsumers();

      console.log('Conexión establecida con RabbitMQ');
    } catch (error) {
      console.error('Error al conectarse a RabbitMQ:', error);
    }
  }

  setupConsumers() {
    const queues = [
      { name: 'visualizar_usuarios', handler: this.handleVisualizarUsuarios },
      { name: 'visualizar_productos', handler: this.handleVisualizarProductos },
      { name: 'producto_creado', handler: this.handleProductoCreado },
      { name: 'create_user', handler: this.handleCreateUser }
    ];

    queues.forEach(({ name, handler }) => {
      this.channel.assertQueue(name, { durable: false });
      this.channel.consume(name, (msg) => {
        handler(msg.content.toString());
      });
    });
  }

  handleVisualizarUsuarios(message) {
    console.log('Mensaje recibido en clientes:', message);
    // Lógica adicional para manejar el mensaje
  }

  handleVisualizarProductos(message) {
    console.log('Mensaje recibido en productos:', message);
    // Lógica adicional para manejar el mensaje
  }

  handleProductoCreado(message) {
    console.log('Mensaje recibido en productos:', message);
    // Lógica adicional para manejar el mensaje
  }

  handleCreateUser(message) {
    console.log('Mensaje recibido en clientes:', message);
    // Lógica adicional para manejar el mensaje
  }

  getConnection() {
    return this.connection;
  }

  getChannel() {
    return this.channel;
  }
}

module.exports = RabbitMQConnection;
