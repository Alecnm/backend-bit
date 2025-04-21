const express = require('express');
const Producto = require('../models/Producto');
const auth = require('../middleware/auth');
const router = new express.Router();

// Crear un nuevo producto
router.post('/productos', auth, async (req, res) => {
  const producto = new Producto({
    ...req.body,
    usuario_id: req.usuario._id,  // Asocia el producto al usuario autenticado
  });

  try {
    await producto.save();
    res.status(201).send(producto);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Obtener todos los productos
router.get('/productos', auth, async (req, res) => {
  try {
    const productos = await Producto.find({ usuario_id: req.usuario._id });
    res.send(productos);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Actualizar un producto
router.patch('/productos/:id', auth, async (req, res) => {
  const actualizaciones = Object.keys(req.body);
  const permitidos = ['nombre', 'descripcion', 'precio', 'cantidad_disponible'];
  const esValido = actualizaciones.every((actualizacion) =>
    permitidos.includes(actualizacion)
  );

  if (!esValido) {
    return res.status(400).send({ error: 'Actualización no permitida.' });
  }

  try {
    const producto = await Producto.findOneAndUpdate(
      { _id: req.params.id, usuario_id: req.usuario._id },
      req.body,
      { new: true }
    );
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Eliminar un producto
router.delete('/productos/:id', auth, async (req, res) => {
  try {
    const producto = await Producto.findOneAndDelete({
      _id: req.params.id,
      usuario_id: req.usuario._id,
    });
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
