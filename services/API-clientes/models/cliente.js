const mongoose = require('../database/db');

const clienteSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
