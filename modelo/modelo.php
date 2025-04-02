<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Modelo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="card p-4 shadow-lg">
            <div class="card-header text-center">
                <h3>CRUD Modelo</h3>
            </div>
            <div class="card-body">
                <form method="POST">
                    <!-- Inclusión de script PHP -->
                    <?php
                        include('../conexion/conexion.php');
                        include "controlador/registro_modelo.php";
                    ?>

                    <h3 class="text-secondary">Registrar Modelo</h3>

                    <div class="mb-3">
                        <label for="caracteristicas" class="form-label">Características del Modelo</label>
                        <input type="text" class="form-control" name="Caracteristicas_Modelo" id="caracteristicas" required>
                    </div>

                    <div class="mb-3">
                        <label for="accesorios" class="form-label">Accesorios del Modelo</label>
                        <input type="text" class="form-control" name="Accesorios_Modelo" id="accesorios" required>
                    </div>

                    <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary" name="btnregistrar" value="ok">Registrar</button>
                        <div class="btn-group">
                        <a href="../Registros.html" class="btn btn-secondary">Regresar</a>
                            <a href="../modelo/comprobar_modelo.php" class="btn btn-warning">Comprobar</a>
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

