const axios = require('axios');

const productosApi = 'http://localhost:3002/productos';

const getProductos = async (req, res) => {
  try {
    const response = await axios.get(productosApi);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.error });
    } else {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  }
};

module.exports = {
  getProductos
};