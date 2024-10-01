<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <style>
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: linear-gradient(to right, #6a11cb, #2575fc);
            font-family: 'Poppins', sans-serif;
        }

        .card {
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s;
            background-color: white;
        }

        .card:hover {
            transform: scale(1.02);
        }

        .card-header {
            background-color: #fff;
            border-radius: 15px 15px 0 0;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 600;
            color: #6a11cb;
        }

        .form-control {
            border-radius: 10px;
            transition: border-color 0.3s;
        }

        .form-control:focus {
            border-color: #6a11cb;
            box-shadow: 0 0 5px rgba(106, 17, 203, 0.5);
        }

        .btn-custom {
            background-color: #6a11cb;
            color: #fff;
            border-radius: 10px;
            transition: background-color 0.3s, transform 0.3s;
        }

        .btn-custom:hover {
            background-color: #2575fc;
            transform: translateY(-2px);
        }

        .options {
            text-align: center;
            margin-top: 10px;
        }

        .options a {
            color: blueviolet;
            transition: color 0.3s;
        }

        .options a:hover {
            color: #2575fc;
        }

        .error {
            color: red;
            display: none;
            margin-top: 10px;
            text-align: center;
        }

        .loading {
            display: none;
            text-align: center;
            font-weight: bold;
            color: blue;
        }
    </style>
</head>

<body>

    <div class="card" style="width: 900px;">
        <div class="card-header">
            Registro
        </div>
        <div class="card-body">
            <form method="POST" id="registroForm">
                <?php include "controlador/registro_persona.php"; ?>
                <div class="mb-3">
                    <label for="Nombre_Usuario_1" class="form-label">Primer Nombre</label>
                    <input type="text" class="form-control" name="Nombre_Usuario_1" id="Nombre_Usuario_1" required>
                </div>
                <div class="mb-3">
                    <label for="Nombre_Usuario_2" class="form-label">Segundo Nombre</label>
                    <input type="text" class="form-control" name="Nombre_Usuario_2" id="Nombre_Usuario_2">
                </div>
                <div class="mb-3">
                    <label for="Apellidos_Usuario_1" class="form-label">Primer Apellido</label>
                    <input type="text" class="form-control" name="Apellidos_Usuario_1" id="Apellidos_Usuario_1" required>
                </div>
                <div class="mb-3">
                    <label for="Apellidos_Usuario_2" class="form-label">Segundo Apellido</label>
                    <input type="text" class="form-control" name="Apellidos_Usuario_2" id="Apellidos_Usuario_2">
                </div>
                <div class="mb-3">
                    <label for="Telefono_1_Usuario" class="form-label">Celular 1</label>
                    <input type="text" class="form-control" name="Telefono_1_Usuario" id="Telefono_1_Usuario" required>
                </div>
                <div class="mb-3">
                    <label for="Telefono_2_Usuario" class="form-label">Teléfono 2</label>
                    <input type="text" class="form-control" name="Telefono_2_Usuario" id="Telefono_2_Usuario">
                </div>
                <div class="mb-3">
                    <label for="Correo_Usuario" class="form-label">Correo</label>
                    <input type="email" class="form-control" name="Correo_Usuario" id="Correo_Usuario" required>
                </div>
                <div class="mb-3 position-relative">
                    <label for="Contraseña_Usuario" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" name="Contraseña_Usuario" id="Contraseña_Usuario" required>
                    <button type="button" class="btn-show-password" id="togglePassword">Mostrar</button>
                </div>
                <div class="mb-3">
                    <label for="Id_Rol" class="form-label">ID Rol</label>
                    <input type="text" class="form-control" name="Id_Rol" id="Id_Rol" required>
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-custom" name="btnregistrar" value="ok">Registrar</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const registroForm = document.getElementById("registroForm");
        const togglePassword = document.getElementById("togglePassword");
        const passwordInput = document.getElementById("Contraseña_Usuario");

        togglePassword.addEventListener("click", function () {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            this.textContent = type === "password" ? "Mostrar" : "Ocultar";
        });

        registroForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevenir el envío del formulario

            let valid = true;

            // Verificación de campos
            registroForm.querySelectorAll("input[required]").forEach(input => {
                if (!input.value) {
                    input.classList.add("is-invalid");
                    valid = false;
                } else {
                    input.classList.remove("is-invalid");
                }
            });

            if (valid) {
                alert("Formulario enviado con éxito.");
                window.location.href = "login.php"; // Cambia a la URL deseada
            } else {
                alert("Por favor, complete todos los campos obligatorios.");
            }
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>
