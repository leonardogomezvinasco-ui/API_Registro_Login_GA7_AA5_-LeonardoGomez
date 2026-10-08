// ===============================================
// app.js
// Maneja Registro y Login consumiendo el servicio web
// ===============================================

// URL base del backend
const API_URL = "http://localhost:3000/api";

// ===============================================
// Función auxiliar para manejar peticiones
// ===============================================
async function enviarFormulario({ url, datos, mensajeEl, boton }) {
  // Deshabilita el botón para evitar doble envío
  if (boton) boton.disabled = true;

  mensajeEl.textContent = "Enviando...";
  mensajeEl.style.color = "black";

  try {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    let data;
    try {
      data = await respuesta.json();
    } catch {
      throw new Error("El servidor no devolvió una respuesta válida");
    }

    if (!respuesta.ok) {
      // El servidor respondió, pero con un error (400, 401, 409, 500, etc.)
      mensajeEl.textContent = data.mensaje || `Error (${respuesta.status})`;
      mensajeEl.style.color = "red";
      return;
    }

    mensajeEl.textContent = data.mensaje || "Operación exitosa";
    mensajeEl.style.color = "green";
    return data;
  } catch (error) {
    mensajeEl.textContent = "Error conectando con el servidor";
    mensajeEl.style.color = "red";
    console.error(error);
  } finally {
    if (boton) boton.disabled = false;
  }
}

// ===============================================
// REGISTRO
// ===============================================
const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
  formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();
    const mensaje = document.getElementById("mensaje");
    const boton = formRegistro.querySelector("button[type='submit']");

    if (!usuario || !password) {
      mensaje.textContent = "Por favor completa todos los campos";
      mensaje.style.color = "red";
      return;
    }

    await enviarFormulario({
      url: `${API_URL}/register`,
      datos: { usuario, password },
      mensajeEl: mensaje,
      boton,
    });
  });
}

// ===============================================
// LOGIN
// ===============================================
const formLogin = document.getElementById("formLogin");

if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuarioLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();
    const mensajeLogin = document.getElementById("mensajeLogin");
    const boton = formLogin.querySelector("button[type='submit']");

    if (!usuario || !password) {
      mensajeLogin.textContent = "Por favor completa todos los campos";
      mensajeLogin.style.color = "red";
      return;
    }

    const data = await enviarFormulario({
      url: `${API_URL}/login`,
      datos: { usuario, password },
      mensajeEl: mensajeLogin,
      boton,
    });

    // Si el backend devuelve un token, aquí lo guardarías, por ejemplo:
    // if (data?.token) localStorage.setItem("token", data.token);
  });
}