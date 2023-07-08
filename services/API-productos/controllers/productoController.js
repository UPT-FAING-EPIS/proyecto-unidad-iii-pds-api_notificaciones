const Producto = require('../models/producto');
const { getChannel } = require('../rabbitmq');
const rabbitmqService = require('../controllers/rabbitmqService');

exports.obtenerProductos = async (req, res) => {
  try {
    Producto.obtenerTodos(async (err, productos) => {
      if (err) {
        console.error('Error al obtener productos:', err);
        return res.status(500).json({ error: 'Error al obtener productos' });
      }
      await rabbitmqService.enviarMensajeRabbitMQ('visualizar_productos', 'visualizando productos');
      res.json(productos);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el canal de RabbitMQ' });
  }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    const nuevoProducto = {
      nombre,
      precio
    };

    Producto.crear(nuevoProducto, async (err, result) => {
      if (err) {
        console.error('Error al crear el producto:', err);
        res.status(500).json({ error: 'Error al crear el producto' });
        return;
      }
      await rabbitmqService.enviarMensajeRabbitMQ('producto_creado', 'producto creado');
      res.json({ mensaje: 'Producto creado exitosamente' });
    });
  } catch (error) {
    console.error('Error al obtener el canal de RabbitMQ:', error);
    res.status(500).json({ error: 'Error al obtener el canal de RabbitMQ' });
  }
};

