<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Hoja de Vida del Equipo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<script>
    function validar() {
        var Id_Equipos = document.getElementById("Id_Equipos");
        var Estado_Equipo = document.getElementById("Estado_Equipo");
        var Id_Usuario = document.getElementById("Id_Usuario");
        var Fecha_Ingreso = document.getElementById("Fecha_Ingreso");

        if (Id_Equipos.value == null || Id_Equipos.value == "") {
            Swal.fire({
                icon: "error",
                title: "Lo Siento",
                text: "El ID del equipo es obligatorio",
            });
            return false;
        } else if (Estado_Equipo.value == null || Estado_Equipo.value == "") {
            Swal.fire({
                icon: "error",
                title: "Lo Siento",
                text: "El estado del equipo es obligatorio",
            });
            return false;
        } else if (Id_Usuario.value == null || Id_Usuario.value == "") {
            Swal.fire({
                icon: "error",
                title: "Lo Siento",
                text: "El ID del usuario es obligatorio",
            });
            return false;
        } else if (Fecha_Ingreso.value == null || Fecha_Ingreso.value == "") {
            Swal.fire({
                icon: "error",
                title: "Lo Siento",
                text: "La fecha de ingreso es obligatoria",
            });
            return false;
        } else {
            Swal.fire({
                icon: "success",
                title: "Datos Ingresados Correctamente",
            });
            return true;
        }
    }
</script>

<body>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="card p-4 shadow-lg">
            <div class="card-header text-center">
                <h3>CRUD Hoja de Vida del Equipo</h3>
            </div>
            <div class="card-body">
                <form method="POST" onsubmit="return validar()">
                    <!-- Inclusión de script PHP -->
                    <?php include "controlador/registro_hv.php"; ?>

                    <div class="mb-3">
                        <label for="Id_Equipos" class="form-label">ID Equipos</label>
                        <input type="number" id="Id_Equipos" class="form-control" name="Id_Equipos" required>
                    </div>

                    <div class="mb-3">
                        <label for="Estado_Equipo" class="form-label">Estado del Equipo</label>
                        <input type="text" id="Estado_Equipo" class="form-control" name="Estado_Equipo" required>
                    </div>

                    <div class="mb-3">
                        <label for="Id_Usuario" class="form-label">ID Usuario</label>
                        <input type="number" id="Id_Usuario" class="form-control" name="Id_Usuario" required>
                    </div>

                    <div class="mb-3">
                        <label for="Fecha_Ingreso" class="form-label">Fecha Ingreso</label>
                        <input type="date" id="Fecha_Ingreso" class="form-control" name="Fecha_Ingreso" required>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <button type="submit" class="btn btn-primary" name="btnregistrar" value="ok">Registrar</button>
                        <div class="btn-group">
                        <a href="../Registros.html" class="btn btn-secondary">Regresar</a>
                            <a href="../hoja_de_vida/comprobar_hv.php" class="btn btn-warning">Comprobar</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
