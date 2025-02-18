<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio de Sesión</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="css/login1.css">
</head>
<body>
    <div class="card" style="width: 500px;">
        <div class="card-header text-center">
            <a href="javascript:history.back()">
                <img src="imagenes/CTJFR.png" alt="Logo" class="logo-img">
            </a>
            <h3>Iniciar Sesión</h3>
        </div>
        <div class="card-body">
            <ul class="nav nav-tabs" id="loginTabs">
                <li class="nav-item">
                    <a class="nav-link active" id="admin-tab" data-bs-toggle="tab" href="#admin-login">Administrador</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="teacher-tab" data-bs-toggle="tab" href="#teacher-login">Profesor</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="gestor-tab" data-bs-toggle="tab" href="#gestor-login">Gestor de Inventario</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="maintenace-tab" data-bs-toggle="tab" href="#maintenace-login">Personal de Mantenimiento</a>
                </li>
            </ul>

            <div class="tab-content mt-3">
                <div class="tab-pane fade show active" id="admin-login">
                    <form id="adminLoginForm">
                        <div class="mb-3">
                            <label for="adminUsername" class="form-label">Administrador</label>
                            <input type="text" class="form-control" id="adminUsername">
                        </div>
                        <div class="mb-3 position-relative">
                            <label for="adminPassword" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="adminPassword">
                            <button type="button" class="btn-show-password" id="toggleAdminPassword">Mostrar</button>
                        </div>
                        <button type="submit" class="btn btn-custom">Iniciar Sesión</button>
                    </form>
                </div>

                <div class="tab-pane fade" id="teacher-login">
                    <form id="teacherLoginForm">
                        <div class="mb-3">
                            <label for="teacherUsername" class="form-label">Profesor</label>
                            <input type="text" class="form-control" id="teacherUsername">
                        </div>
                        <div class="mb-3 position-relative">
                            <label for="teacherPassword" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="teacherPassword">
                            <button type="button" class="btn-show-password" id="toggleTeacherPassword">Mostrar</button>
                        </div>
                        <button type="submit" class="btn btn-custom">Iniciar Sesión</button>
                    </form>
                </div>

                <div class="tab-pane fade" id="gestor-login">
                    <form id="gestorLoginForm">
                        <div class="mb-3">
                            <label for="gestorUsername" class="form-label">Gestor de Inventario</label>
                            <input type="text" class="form-control" id="gestorUsername">
                        </div>
                        <div class="mb-3 position-relative">
                            <label for="gestorPassword" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="gestorPassword">
                            <button type="button" class="btn-show-password" id="toggleGestorPassword">Mostrar</button>
                        </div>
                        <button type="submit" class="btn btn-custom">Iniciar Sesión</button>
                    </form>
                </div>

                <div class="tab-pane fade" id="maintenace-login">
                    <form id="maintenaceLoginForm">
                        <div class="mb-3">
                            <label for="maintenaceUsername" class="form-label">Personal de Mantenimiento</label>
                            <input type="text" class="form-control" id="maintenaceUsername">
                        </div>
                        <div class="mb-3 position-relative">
                            <label for="maintenacePassword" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="maintenacePassword">
                            <button type="button" class="btn-show-password" id="toggleMaintenacePassword">Mostrar</button>
                        </div>
                        <button type="submit" class="btn btn-custom">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        function togglePasswordVisibility(inputId, buttonId) {
            document.getElementById(buttonId).addEventListener("click", function () {
                const passwordInput = document.getElementById(inputId);
                const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
                passwordInput.setAttribute("type", type);
                this.textContent = type === "password" ? "Mostrar" : "Ocultar";
            });
        }

        togglePasswordVisibility("adminPassword", "toggleAdminPassword");
        togglePasswordVisibility("teacherPassword", "toggleTeacherPassword");
        togglePasswordVisibility("gestorPassword", "toggleGestorPassword");
        togglePasswordVisibility("maintenacePassword", "toggleMaintenacePassword");

        document.getElementById("adminLoginForm").addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("adminUsername").value.trim();
            const password = document.getElementById("adminPassword").value.trim();

            if (username === "Felipe" && password === "031006") {
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: 'Bienvenido, ' + username + '!',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = "inicio.html";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales incorrectas',
                    text: 'Por favor, verifica tu nombre de usuario y contraseña.',
                    confirmButtonText: 'Reintentar'
                });
            }
        });

        document.getElementById("teacherLoginForm").addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("teacherUsername").value.trim();
            const password = document.getElementById("teacherPassword").value.trim();

            if (username === "Profesor1" && password === "123456") {
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: 'Bienvenido, Profesor ' + username + '!',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = "dashboard_profesor.html";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales incorrectas',
                    text: 'Por favor, verifica tu nombre de usuario y contraseña.',
                    confirmButtonText: 'Reintentar'
                });
            }
        });

        document.getElementById("gestorLoginForm").addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("gestorUsername").value.trim();
            const password = document.getElementById("gestorPassword").value.trim();

            if (username === "gestor" && password === "123456") {
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: 'Bienvenido, Gestor ' + username + '!',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = "dashboard_gestor.html";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales incorrectas',
                    text: 'Por favor, verifica tu nombre de usuario y contraseña.',
                    confirmButtonText: 'Reintentar'
                });
            }
        });

        document.getElementById("maintenaceLoginForm").addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("maintenaceUsername").value.trim();
            const password = document.getElementById("maintenacePassword").value.trim();

            if (username === "mantenimiento" && password === "123456") {
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: 'Bienvenido, Mantenimiento ' + username + '!',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = "dashboard_mantenimiento.html";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales incorrectas',
                    text: 'Por favor, verifica tu nombre de usuario y contraseña.',
                    confirmButtonText: 'Reintentar'
                });
            }
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
