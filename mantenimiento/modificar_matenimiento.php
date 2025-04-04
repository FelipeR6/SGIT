<?php
include('../conexion/conexion.php');
$id = $_GET["id"];
$sql = $conexion->query("SELECT * FROM mantenimiento WHERE Id_Mantenimiento = $id");
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Modificar Mantenimiento</title>
</head>

<body>
    <!-- Contenedor Principal -->
    <div class="container py-5">
        <form class="form-modificar col-12 col-md-6 col-lg-4 mx-auto" method="POST">
            <h3 class="text-center text-secondary mb-4">Modificar Mantenimiento</h3>
            <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">

            <?php
            include "controlador/modificar_mantenimiento.php";
            while ($datos = $sql->fetch_object()) { ?>
                <div class="mb-3">
                    <label for="fecha_inicio" class="form-label">Fecha Inicio Mantenimiento</label>
                    <input type="date" class="form-control" name="Fecha_Inicio_mantenimiento" value="<?= htmlspecialchars($datos->Fecha_Inicio_mantenimiento) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="fecha_fin" class="form-label">Fecha Fin Mantenimiento</label>
                    <input type="date" class="form-control" name="Fecha_fin_mantenimiento" value="<?= htmlspecialchars($datos->Fecha_fin_mantenimiento) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="observaciones" class="form-label">Observaciones</label>
                    <input type="text" class="form-control" name="Observaciones" value="<?= htmlspecialchars($datos->Observaciones) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="id_equipos" class="form-label">ID Equipos</label>
                    <input type="number" class="form-control" name="Id_Equipos" value="<?= htmlspecialchars($datos->Id_Equipos) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="id_usuario" class="form-label">ID Usuario</label>
                    <input type="number" class="form-control" name="Id_Usuario" value="<?= htmlspecialchars($datos->Id_Usuario) ?>" required>
                </div>
            <?php } ?>

            <!-- Botón para modificar -->
            <button type="submit" class="btn btn-primary btn-modificar w-100" name="btnmodificar" value="ok">Modificar</button>
            <a href="../mantenimiento/comprobar_mantenimiento.php" class="btn btn-secondary w-100 mt-3">Regresar</a>
        </form>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
