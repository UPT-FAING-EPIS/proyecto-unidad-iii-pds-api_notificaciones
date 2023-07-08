const express = require('express');
const bodyParser = require('body-parser');
const clientesRouter = require('./routes/clientes');
const { connectToRabbitMQ } = require('./rabbitmq');

const app = express();

// Configuración de middleware
app.use(bodyParser.json());

// Rutas
app.use('/clientes', clientesRouter);

// Establecer conexión con RabbitMQ
connectToRabbitMQ();

// Puerto de escucha
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
