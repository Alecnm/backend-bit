const express = require('express');
const router = express.Router();
const { getAllProductos, createProducto, deleteProducto } = require('../controllers/productoController');
const auth = require('../middleware/authMiddleware');

// Estas rutas requieren token
router.get('/', auth, getAllProductos);
router.post('/', auth, createProducto);
router.delete('/:id', auth, deleteProducto);

module.exports = router;
