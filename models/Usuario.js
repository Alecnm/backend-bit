// backend/models/Usuario.js

const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Asegúrate de que este campo sea obligatorio
  },
  email: {
    type: String,
    required: true,
    unique: true, // Esto asegura que el email sea único
  },
  password: {
    type: String,
    required: true,
  },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
