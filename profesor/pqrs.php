<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PQRS</title>
  <link rel="stylesheet" href="../css/inicio.css" />
  <link rel="stylesheet" href="../css/tablas.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
    rel="stylesheet" />
</head>

<body>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>SGIT</h2>
      <div class="theme-toggle">
        <i class="fa-solid fa-sun sun"></i>
        <label class="switch">
          <input type="checkbox" id="theme-toggle" />
          <span class="slider"></span>
        </label>
        <i class="fa-solid fa-moon moon"></i>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-item">
        <div class="nav-link-wrapper">
          <div class="item-glow inventory-glow"></div>
          <a href="dashboard_profesor.HTML" class="nav-link-front">
            <i class="fas fa-home nav-icon inventory-icon"></i>
            <span>Inicio</span>
          </a>
          <a href="dashboard_profesor.HTML" class="nav-link-back">
            <i class="fas fa-home nav-icon inventory-icon"></i>
            <span>Inicio</span>
          </a>
        </div>
      </div>

      <div class="nav-item">
        <div class="nav-link-wrapper">
          <div class="item-glow inventory-glow"></div>
          <a href="inventario.html" class="nav-link-front">
            <i class="fas fa-box nav-icon inventory-icon"></i>
            <span>Inventario</span>
          </a>
          <a href="inventario.html" class="nav-link-back">
            <i class="fas fa-box nav-icon inventory-icon"></i>
            <span>Inventario</span>
          </a>
        </div>
      </div>

      <div class="nav-item">
        <div class="nav-link-wrapper">
          <div class="item-glow maintenance-glow"></div>
          <a href="mantenimiento.html" class="nav-link-front">
            <i class="fas fa-tools nav-icon maintenance-icon"></i>
            <span>Mantenimiento</span>
          </a>
          <a href="mantenimiento.html" class="nav-link-back">
            <i class="fas fa-tools nav-icon maintenance-icon"></i>
            <span>Mantenimiento</span>
          </a>
        </div>
      </div>

      <div class="nav-item">
        <div class="nav-link-wrapper">
          <div class="item-glow admin-glow"></div>
          <a href="prestamo.html" class="nav-link-front">
            <i class="fas fa-cogs nav-icon admin-icon"></i>
            <span>Prestamo</span>
          </a>
          <a href="prestamo.html" class="nav-link-back">
            <i class="fas fa-cogs nav-icon admin-icon"></i>
            <span>Prestamo</span>
          </a>
        </div>
      </div>

      <div class="nav-item">
        <div class="nav-link-wrapper">
          <div class="item-glow profile-glow"></div>
          <a href="perfil.html" class="nav-link-front">
            <i class="fas fa-user nav-icon profile-icon"></i>
            <span>Perfil</span>
          </a>
          <a href="perfil.html" class="nav-link-back">
            <i class="fas fa-user nav-icon profile-icon"></i>
            <span>Perfil</span>
          </a>
        </div>
      </div>

      <div class="nav-item">
        <div class="nav-link-wrapper">
          <div class="item-glow logout-glow"></div>
          <a href="../index.html" class="nav-link-front">
            <i class="fas fa-sign-out-alt nav-icon logout-icon"></i>
            <span>Cerrar Sesión</span>
          </a>
          <a href="../index.html" class="nav-link-back">
            <i class="fas fa-sign-out-alt nav-icon logout-icon"></i>
            <span>Cerrar Sesión</span>
          </a>
        </div>
      </div>
    </nav>
  </aside>

  <main class="content">
    <div class="top-bar">
      <h1>PQRS</h1>
      <p>Envía tus Peticiones, Quejas, Reclamos o Sugerencias</p>
    </div>

    <section class="form-container">
      <form id="pqrsForm">
        <div class="form-group">
          <label for="name">Nombre Completo:</label>
          <input type="text" id="name" name="name" placeholder="Ej. Juan Pérez" required>
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" placeholder="Ej. correo@ejemplo.com" required>
        </div>
        <div class="form-group">
          <label for="pqrsType">Tipo de PQRS:</label>
          <select id="pqrsType" name="pqrsType" required>
            <option value="">Seleccione una opción</option>
            <option value="peticion">Petición</option>
            <option value="queja">Queja</option>
            <option value="reclamo">Reclamo</option>
            <option value="sugerencia">Sugerencia</option>
          </select>
        </div>
        <div class="form-group">
          <label for="message">Mensaje:</label>
          <textarea id="message" name="message" rows="4" placeholder="Escribe tu mensaje aquí..." required></textarea>
        </div>
        <button type="submit" class="cta-btn">Enviar</button>
      </form>
    </section>
  </main>

  <script>
    document.getElementById("pqrsForm").addEventListener("submit", function(event) {
      event.preventDefault();
      Swal.fire({
        title: "Éxito",
        text: "Formulario enviado exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar"
      });
      this.reset();
    });

    // Cambio de tema
    const themeToggle = document.getElementById("theme-toggle");
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      themeToggle.checked = true;
    }
    themeToggle.addEventListener("change", function() {
      document.body.classList.toggle("dark", this.checked);
      localStorage.setItem("theme", this.checked ? "dark" : "light");
    });
  </script>
</body>

</html>