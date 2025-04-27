const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productoRoutes = require('./routes/producto');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

// Cargar las variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el body de las solicitudes como JSON

// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/auth', authRoutes);
// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos MongoDB'))
  .catch(err => console.log('Error al conectar con MongoDB: ', err));

// Configurar el puerto
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
module.exports = app;