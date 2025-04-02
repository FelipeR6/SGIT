<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Ubicacion</title>
    <!-- Estilos -->
    <link href="../css/crud.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="card p-4 shadow-lg">
            <div class="card-header">
                <h3>CRUD Ubicacion</h3>
            </div>
            <div class="card-body">
                <form method="POST">
                    <!-- Inclusión de script PHP -->
                    <?php include "controlador/registro_ubicacion.php"; ?>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="Nombre_Ubicacion" class="form-label">Nombre Ubicacion</label>
                            <input type="text" id="Nombre_Ubicacion" class="form-control" name="Nombre_Ubicacion" required>
                        </div>
                        <div class="col-md-6">
                            <label for="Prestamo_disponible" class="form-label">Prestamo disponible</label>
                            <input type="text" id="Prestamo_disponible" class="form-control" name="Prestamo_disponible" required>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <button type="submit" class="btn btn-custom" name="btnregistrar" value="ok">Registrar</button>
                        <div class="btn-group">
                            <a href="../inicio.html" class="btn btn-secondary">Regresar</a>
                            <a href="../ubicacion/comprobar_ubicacion.php" class="btn btn-warning">Comprobar</a>
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
