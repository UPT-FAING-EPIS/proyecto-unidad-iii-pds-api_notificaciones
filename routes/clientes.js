const express = require('express');
const clientesController = require('../controllers/clientesController');

const router = express.Router();

// Ruta principal
router.get('/', clientesController.getClientes);

module.exports = router;