<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Préstamo Equipo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="card p-4 shadow-lg">
            <div class="card-header">
                <h3>CRUD Préstamo Equipo</h3>
            </div>
            <div class="card-body">
                <form method="POST">
                    <!-- Inclusión de script PHP -->
                    <?php include "controlador/registro_prestamo.php"; ?>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="Fecha_Prestamo_Equipo" class="form-label">Fecha Préstamo</label>
                            <input type="date" id="Fecha_Prestamo_Equipo" class="form-control" name="Fecha_Prestamo_Equipo" required>
                        </div>
                        <div class="col-md-6">
                            <label for="Fecha_entrega_prestamo" class="form-label">Fecha Entrega</label>
                            <input type="date" id="Fecha_entrega_prestamo" class="form-control" name="Fecha_entrega_prestamo" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="Id_Usuario" class="form-label">ID Usuario</label>
                            <input type="number" id="Id_Usuario" class="form-control" name="Id_Usuario" required>
                        </div>
                        <div class="col-md-6">
                            <label for="Id_Equipos" class="form-label">ID Equipos</label>
                            <input type="number" id="Id_Equipos" class="form-control" name="Id_Equipos" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                            <label for="Id_Equipos" class="form-label">ID Ubicacion</label>
                            <input type="number" id="Id_Ubicacion" class="form-control" name="Id_Ubicacion" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                            <label for="Id_Equipos" class="form-label">ID Id_Estado_Equipo</label>
                            <input type="number" id="Id_Estado_Equipo" class="form-control" name="Id_Estado_Equipo" required>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <button type="submit" class="btn btn-primary" name="btnregistrar" value="ok">Registrar</button>
                        <div class="btn-group">
                        <a href="../Registros.html" class="btn btn-secondary">Regresar</a>
                            <a href="../prestamo_equipo/comprobar_prestamo.php" class="btn btn-warning">Comprobar</a>
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
