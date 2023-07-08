const db = require('../database/db');

const Producto = {
  obtenerTodos: (callback) => {
    const query = 'SELECT * FROM productos';
    db.query(query, callback);
  },
  crear: (nuevoProducto, callback) => {
    const { nombre, precio } = nuevoProducto;
    const query = 'INSERT INTO productos (nombre, precio) VALUES (?, ?)';
    db.query(query, [nombre, precio], callback);
  }
};

module.exports = Producto;
