const express = require('express');
const bodyParser = require('body-parser');
const productosRouter = require('./routes/productos');
const { connectToRabbitMQ } = require('./rabbitmq');

const app = express();

// Configuración de middleware
app.use(bodyParser.json());
    // Rutas
    app.use('/productos', productosRouter);

    // Establecer conexión con RabbitMQ
    connectToRabbitMQ();
    
    // Puerto de escucha
    const port = 3002;
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });