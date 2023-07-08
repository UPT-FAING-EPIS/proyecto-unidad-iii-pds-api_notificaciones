const express = require('express');
const bodyParser = require('body-parser');
const productosRouter = require('./routes/productos');
const clientesRouter = require('./routes/clientes');
const amqp = require('amqplib/callback_api');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const RabbitMQConnection = require('./rabbitmq');

const app = express();
const server = http.createServer(app);

// Configuración de middleware
app.use(bodyParser.json());

const port = 3000;

app.use('/api/clientes', clientesRouter);
app.use('/api/productos', productosRouter);

const rabbitmq = new RabbitMQConnection('amqps://fioyqbtx:u2eSjzIKcYeW1u4eB9VsdcInAatSYCXe@prawn.rmq.cloudamqp.com/fioyqbtx');
rabbitmq.connect();
server.listen(port, () => {
  console.log(`API notificaciones running on http://localhost:${port}`);
});


