const Producto = require('../models/Producto');

// Obtener todos los productos
exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  const { nombre, descripcion, precio } = req.body;

  try {
    const newProducto = new Producto({
      nombre,
      descripcion,
      precio,
    });
    await newProducto.save();
    res.status(201).json(newProducto);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};

// Eliminar un producto
exports.deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByIdAndDelete(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};