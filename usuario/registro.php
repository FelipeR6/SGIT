<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <!-- Estilos -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="card p-4 shadow-lg" style="width: 900px;">
            <div class="card-header">
                <h3>Registro de Usuario</h3>
            </div>
            <div class="card-body">
                <form method="POST" action="controlador/registro_persona.php" id="registroForm">
                    <div class="row mb-3">
                    <div class="col-md-6">
                            <label for="Usuario" class="form-label">Usuario</label>
                            <input type="text" class="form-control" name="Usuario" id="Usuario" required>
                            <div class="invalid-feedback">Este campo es obligatorio.</div>
                        </div>
                        <div class="col-md-6">
                            <label for="Nombre_Usuario_1" class="form-label">Primer Nombre</label>
                            <input type="text" class="form-control" name="Nombre_Usuario_1" id="Nombre_Usuario_1" required>
                            <div class="invalid-feedback">Este campo es obligatorio.</div>
                        </div>
                        <div class="col-md-6">
                            <label for="Nombre_Usuario_2" class="form-label">Segundo Nombre</label>
                            <input type="text" class="form-control" name="Nombre_Usuario_2" id="Nombre_Usuario_2">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="Apellidos_Usuario_1" class="form-label">Primer Apellido</label>
                            <input type="text" class="form-control" name="Apellidos_Usuario_1" id="Apellidos_Usuario_1" required>
                            <div class="invalid-feedback">Este campo es obligatorio.</div>
                        </div>
                        <div class="col-md-6">
                            <label for="Apellidos_Usuario_2" class="form-label">Segundo Apellido</label>
                            <input type="text" class="form-control" name="Apellidos_Usuario_2" id="Apellidos_Usuario_2">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="Telefono_1_Usuario" class="form-label">Celular 1</label>
                        <input type="text" class="form-control" name="Telefono_1_Usuario" id="Telefono_1_Usuario" required>
                        <div class="invalid-feedback">Este campo es obligatorio.</div>
                    </div>

                    <div class="mb-3">
                        <label for="Correo_Usuario" class="form-label">Correo</label>
                        <input type="email" class="form-control" name="Correo_Usuario" id="Correo_Usuario" required>
                        <div class="invalid-feedback">Este campo es obligatorio.</div>
                    </div>

                    <div class="mb-3 position-relative">
                        <label for="Contraseña" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" name="Contraseña" id="Contraseña" required>
                        <button type="button" class="btn btn-outline-secondary position-absolute top-0 end-0" id="togglePassword">Mostrar</button>
                        <div class="invalid-feedback">Este campo es obligatorio.</div>
                    </div>

                    <div class="mb-3">
                        <label for="Id_Rol" class="form-label">ID Rol</label>
                        <input type="text" class="form-control" name="Id_Rol" id="Id_Rol" required>
                        <div class="invalid-feedback">Este campo es obligatorio.</div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <button type="submit" class="btn btn-custom" name="btnregistrar" value="ok">Registrar</button>
                        <div class="btn-group">
                        <a href="../Registros.html" class="btn btn-secondary">Regresar</a>
                            <a href="../usuario/comprobar_registro.php" class="btn btn-warning">Comprobar</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script>
        const registroForm = document.getElementById("registroForm");
        const togglePassword = document.getElementById("togglePassword");
        const passwordInput = document.getElementById("Contraseña");

        togglePassword.addEventListener("click", function() {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            this.textContent = type === "password" ? "Mostrar" : "Ocultar";
        });

        registroForm.addEventListener("submit", function(event) {
            let valid = true;

            registroForm.querySelectorAll("input[required]").forEach(input => {
                if (!input.value) {
                    input.classList.add("is-invalid");
                    valid = false;
                } else {
                    input.classList.remove("is-invalid");
                }
            });

            if (!valid) {
                event.preventDefault();
            }
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
