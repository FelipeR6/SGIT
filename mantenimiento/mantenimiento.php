<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Mantenimiento</title>
    <!-- Estilos -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
        <div class="card p-4 shadow-lg">
            <div class="card-header">
                <h3>CRUD Mantenimiento</h3>
            </div>
            <div class="card-body">
                <form method="POST">
                    <!-- Inclusión de script PHP -->
                    <?php include "controlador/registro_mantenimiento.php"; ?>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="Fecha_Inicio_mantenimiento" class="form-label">Fecha Inicio</label>
                            <input type="date" id="Fecha_Inicio_mantenimiento" class="form-control" name="Fecha_Inicio_mantenimiento" required>
                        </div>
                        <div class="col-md-6">
                            <label for="Fecha_fin_mantenimiento" class="form-label">Fecha Fin</label>
                            <input type="date" id="Fecha_fin_mantenimiento" class="form-control" name="Fecha_fin_mantenimiento" required>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="Observaciones" class="form-label">Observaciones</label>
                        <textarea id="Observaciones" class="form-control" name="Observaciones" rows="3" placeholder="Escribe aquí..." required></textarea>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="Id_Equipos" class="form-label">ID Equipos</label>
                            <input type="number" id="Id_Equipos" class="form-control" name="Id_Equipos" required>
                        </div>
                        <div class="col-md-6">
                            <label for="Id_Usuario" class="form-label">ID Usuario</label>
                            <input type="number" id="Id_Usuario" class="form-control" name="Id_Usuario" required>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <button type="submit" class="btn btn-custom" name="btnregistrar" value="ok">Registrar</button>
                        <div class="btn-group">
                        <a href="../Registros.html" class="btn btn-secondary">Regresar</a>
                            <a href="../mantenimiento/comprobar_mantenimiento.php" class="btn btn-warning">Comprobar</a>
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
