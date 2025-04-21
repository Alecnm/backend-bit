const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  contrasena: {
    type: String,
    required: true,
    minlength: 6,
  },
  rol: {
    type: String,
    required: true,
    enum: ['admin', 'usuario'],
    default: 'usuario',
  }
}, {
  timestamps: true,
});

usuarioSchema.pre('save', async function(next) {
  if (this.isModified('contrasena')) {
    this.contrasena = await bcrypt.hash(this.contrasena, 8);
  }
  next();
});

usuarioSchema.methods.generarAuthToken = async function() {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  return token;
};

module.exports = mongoose.model('Usuario', usuarioSchema);
