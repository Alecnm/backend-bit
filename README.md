# Backend BIT

Este proyecto corresponde a la segunda entrega del diplomado en desarrollo web full stack. Aquí se configura la base técnica del backend utilizando Node.js, Express.js y MongoDB para un sistema de gestión de inventarios.

## Requisitos

- Node.js instalado
- MongoDB local o Atlas
- Editor de código (Visual Studio Code recomendado)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Alecnm/backend-bit.git
   ```

2. Entrar a la carpeta del proyecto:
   ```bash
   cd backend-bit
   ```

3. Instalar las dependencias:
   ```bash
   npm install
   ```

4. Crear un archivo `.env` con el siguiente contenido:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/tu_nombre_de_base_de_datos
   JWT_SECRET=tu_secreto_aqui
   ```

   > Cambia el valor de `MONGODB_URI` si usas MongoDB Atlas.

## Uso

Iniciar el servidor con:

```bash
npm run dev
```

El servidor iniciará en `http://localhost:3000/` y mostrará un mensaje de prueba si todo funciona correctamente.

## Estructura del proyecto

- `app.js`: archivo principal de la aplicación.
- `models/Usuario.js`: modelo de datos de usuario.
- `models/Producto.js`: modelo de datos de producto para la gestión de inventarios.
- `routes/producto.js`: rutas para la gestión de productos (agregar, listar, actualizar y eliminar productos).
- `routes/usuario.js`: rutas para el manejo de usuarios (registro y autenticación).
- `middleware/auth.js`: middleware para la autenticación de usuarios.
- `.env`: configuración de variables de entorno.
- `.gitignore`: ignora carpetas y archivos innecesarios como `node_modules`.

## Modelos de Datos

### Modelo Usuario

El modelo `Usuario` incluye los siguientes campos:

- `nombre` (String)
- `correo` (String)
- `contraseña` (String)
- `rol` (String, valores posibles: `"admin"`, `"usuario"`)

### Modelo Producto

El modelo `Producto` incluye los siguientes campos:

- `nombre` (String)
- `descripcion` (String)
- `precio` (Number)
- `cantidad_disponible` (Number)
- `usuario_id` (ObjectId, referencia al usuario que gestionará el producto)

## Rutas

### Rutas de Producto

- **POST `/productos`**: Crear un nuevo producto. Requiere autenticación.
- **GET `/productos`**: Obtener todos los productos del usuario autenticado.
- **PATCH `/productos/:id`**: Actualizar un producto específico. Requiere autenticación.
- **DELETE `/productos/:id`**: Eliminar un producto específico. Requiere autenticación.

### Rutas de Usuario

- **POST `/usuarios`**: Crear un nuevo usuario (registro).
- **POST `/usuarios/login`**: Autenticación de usuario (login).

## Autor

Alec
