const Cliente = require('../models/cliente');
const { getChannel } = require('../rabbitmq');
const rabbitmqService = require('../controllers/rabbitmqService');

exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    await rabbitmqService.enviarMensajeRabbitMQ('visualizar_usuarios', 'visualizando usuarios');
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el canal de RabbitMQ' });
  }
};


exports.crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    await rabbitmqService.enviarMensajeRabbitMQ('create_user', 'usuario creado');

    res.json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el canal de RabbitMQ' });
  }
};


exports.eliminarCliente = (req, res) => {
  Cliente.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(500).json({ error: err.message }));
};
