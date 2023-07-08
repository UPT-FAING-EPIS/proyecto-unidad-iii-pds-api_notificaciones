const express = require('express');
const productosController = require('../controllers/productosController');

const router = express.Router();

// Ruta principal
router.get('/', productosController.getProductos);

module.exports = router;