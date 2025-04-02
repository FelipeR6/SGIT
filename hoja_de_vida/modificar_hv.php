<?php
include('../conexion/conexion.php');

// Obtener el ID de la URL y consultar la base de datos
$id = $_GET["id"];
$sql = $conexion->query("SELECT * FROM hoja_vida_equipo WHERE Id_Hoja_vida_equipo = $id");
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Modificar Hoja de Vida</title>

</head>

<body>
    <!-- Contenedor Principal -->
    <div class="container py-5">
        <form class="form-modificar col-12 col-md-6 col-lg-4 mx-auto" method="POST">
            <h3 class="text-center text-secondary mb-4">Modificar Hoja de Vida</h3>
            <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">

            <?php
            include "controlador/modificar_hv.php";
            while ($datos = $sql->fetch_object()) { ?>
                <div class="mb-3">
                    <label for="id_equipos" class="form-label">ID Equipos</label>
                    <input type="number" class="form-control" name="Id_Equipos" value="<?= htmlspecialchars($datos->Id_Equipos) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="estado_equipo" class="form-label">Estado del Equipo</label>
                    <input type="text" class="form-control" name="Estado_Equipo" value="<?= htmlspecialchars($datos->Estado_Equipo) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="id_usuario" class="form-label">ID Usuario</label>
                    <input type="number" class="form-control" name="Id_usuario" value="<?= htmlspecialchars($datos->Id_usuario) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="fecha_ingreso" class="form-label">Fecha Ingreso</label>
                    <input type="date" class="form-control" name="Fecha_ingreso" value="<?= htmlspecialchars($datos->Fecha_ingreso) ?>" required>
                </div>
            <?php } ?>

            <!-- Botón para modificar -->
            <button type="submit" class="btn btn-primary btn-modificar w-100" name="btnmodificar" value="ok">Modificar</button>
            <a href="../hoja_de_vida/comprobar_hv.php" class="btn btn-secondary w-100 mt-3">Regresar</a>
        </form>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
