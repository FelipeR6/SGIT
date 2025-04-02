<?php
include('../conexion/conexion.php');
$id = $_GET["id"];
$sql = $conexion->query("SELECT * FROM ubicacion WHERE Id_Ubicacion = $id");
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Modificar Ubicacion</title>
    <link rel="stylesheet" href="../css/crud.css">
</head>

<body>
    <!-- Contenedor Principal -->
    <div class="container py-5">
        <form class="form-modificar col-12 col-md-6 col-lg-4 mx-auto" method="POST">
            <h3 class="text-center text-secondary mb-4">Modificar Ubicacion</h3>
            <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">

            <?php
            include "controlador/modificar_ubicacion.php";
            while ($datos = $sql->fetch_object()) { ?>
                <div class="mb-3">
                    <label for="Nombre_Ubicacion" class="form-label">Nombre Ubicacion</label>
                    <input type="text" class="form-control" name="Nombre_Ubicacion" value="<?= htmlspecialchars($datos->Nombre_Ubicacion) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Prestamo_disponible" class="form-label">Prestamo disponible</label>
                    <input type="text" class="form-control" name="Prestamo_disponible" value="<?= htmlspecialchars($datos->Prestamo_disponible) ?>" required>
                </div>
            <?php } ?>

            <!-- Botón para modificar -->
            <button type="submit" class="btn btn-primary btn-modificar w-100" name="btnmodificar" value="ok">Modificar</button>
            <a href="../ubicacion/comprobar_ubicacion.php" class="btn btn-secondary w-100 mt-3">Regresar</a>
        </form>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
