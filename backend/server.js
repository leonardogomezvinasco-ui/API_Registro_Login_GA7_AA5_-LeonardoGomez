// ===============================================
// server.js
// Servicio Web para Registro e Inicio de Sesión
// GA7-220501096-AA5-EV01
// ===============================================
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware: permite recibir JSON y habilita CORS
app.use(express.json());
app.use(cors());

// ===============================================
// "Base de datos" en memoria (para ejemplo académico)
// Aquí se guardan los usuarios temporalmente
// ===============================================
let usuarios = [
  // Usuario de prueba por defecto
  { usuario: "admin", password: "1234" }
];

// ===============================================
// Endpoint: Registro de usuario
// POST http://localhost:3000/api/register
// Body JSON: { "usuario": "...", "password": "..." }
// ===============================================
app.post("/api/register", (req, res) => {
  const { usuario, password } = req.body;

  // Validación: verificar que los datos lleguen completos
  if (!usuario || !password) {
    return res.status(400).json({
      mensaje: "Debe enviar usuario y contraseña"
    });
  }

  // Verificar si el usuario ya existe
  const existe = usuarios.find(u => u.usuario === usuario);

  if (existe) {
    return res.status(409).json({
      mensaje: "El usuario ya existe"
    });
  }

  // Guardar el nuevo usuario
  usuarios.push({ usuario, password });

  return res.status(201).json({
    mensaje: "Usuario registrado correctamente"
  });
});

// ===============================================
// Endpoint: Login (inicio de sesión)
// POST http://localhost:3000/api/login
// Body JSON: { "usuario": "...", "password": "..." }
// ===============================================
app.post("/api/login", (req, res) => {
  const { usuario, password } = req.body;

  // Validación: verificar que los datos lleguen completos
  if (!usuario || !password) {
    return res.status(400).json({
      mensaje: "Debe enviar usuario y contraseña"
    });
  }

  // Buscar el usuario y contraseña en la lista
  const encontrado = usuarios.find(
    u => u.usuario === usuario && u.password === password
  );

  // Respuesta según autenticación
  if (encontrado) {
    return res.status(200).json({
      mensaje: "Autenticación satisfactoria"
    });
  } else {
    return res.status(401).json({
      mensaje: "Error en la autenticación"
    });
  }
});

// ===============================================
// Iniciar servidor
// ===============================================
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});