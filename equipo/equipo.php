<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Equipo</title>
    <!-- Estilos -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<script>
    function validar() {
        var Marca_Equipo = document.getElementById("Marca_Equipo");
        var Año_Equipo = document.getElementById("Año_Equipo");
        var Id_Categoria = document.getElementById("Id_Categoria");
        var Id_Modelo = document.getElementById("Id_Modelo");
        var Id_Usuario = document.getElementById("Id_Usuario");

        if (Marca_Equipo.value == null || Marca_Equipo.value == "") {
            Swal.fire({
                icon: "error",
                title: "Lo Siento",
                text: "La marca del equipo es obligatoria",
            });
            return false;
        } else if (Año_Equipo.value == null || Año_Equipo.value == "") {
            Swal.fire({
                icon: "error",
                title: "Lo Siento",
                text: "El año del equipo es obligatorio",
            });
            return false;
        } else if (Id_Categoria.value == null || Id_Categoria.value == "") {
            Swal.fire({
                icon: "error",
                title: "Lo Siento",
                text: "La Categoria es obligatoria",
            });
            return false;
        } else if (Id_Modelo.value == null || Id_Modelo.value == "") {
            Swal.fire({
                icon: "error",
                title: "Lo Siento",
                text: "El modelo del equipo es obligatorio",
            });
            return false;
        } else if (Id_Usuario.value == null || Id_Usuario.value == "") {
            Swal.fire({
                icon: "error",
                title: "Lo Siento",
                text: "El Usuario es obligatorio",
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
                <h3>CRUD Equipo</h3>
            </div>
            <div class="card-body">
                <form method="POST" onsubmit="return validar()">
                    <!-- Inclusión de script PHP -->
                    <?php include "controlador/registro_equipo.php"; ?>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="Marca_Equipo" class="form-label">Marca del Equipo</label>
                            <input type="text" id="Marca_Equipo" class="form-control" name="Marca_Equipo" required>
                        </div>
                        <div class="col-md-6">
                            <label for="Año_Equipo" class="form-label">Año del Equipo</label>
                            <input type="text" id="Año_Equipo" class="form-control" name="Año_Equipo" required>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="Id_Categoria" class="form-label">Categoría</label>
                        <input type="text" id="Id_Categoria" class="form-control" name="Id_Categoria" required>
                    </div>

                    <div class="mb-3">
                        <label for="Id_Modelo" class="form-label">Modelo</label>
                        <input type="text" id="Id_Modelo" class="form-control" name="Id_Modelo" required>
                    </div>

                    <div class="mb-3">
                        <label for="Id_Usuario" class="form-label">ID del Usuario</label>
                        <input type="text" id="Id_Usuario" class="form-control" name="Id_Usuario" required>
                    </div>

                    <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary" name="btnregistrar" value="ok">Registrar</button>
                        <div class="btn-group">
                        <a href="../Registros.html" class="btn btn-secondary">Regresar</a>
                            <a href="../equipo/comprobar_equipo.php" class="btn btn-warning">Comprobar</a>
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
