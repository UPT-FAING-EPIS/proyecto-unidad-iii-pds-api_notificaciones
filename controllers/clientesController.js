const axios = require('axios');

const clientesApi = 'http://localhost:3001/clientes';

const getClientes = async (req, res) => {
  try {
    const response = await axios.get(clientesApi);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.error });
    } else {
      res.status(500).json({ error: 'Error al obtener los clientes' });
    }
  }
};

module.exports = {
  getClientes
};