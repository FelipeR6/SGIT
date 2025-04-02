<?php
include('../conexion/conexion.php');

// Obtener el ID de la URL y consultar la base de datos
$id = $_GET["id"];
$sql = $conexion->query("SELECT * FROM modelo WHERE Id_Modelo = $id");
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Modificar Modelo</title>
</head>

<body>

    <!-- Contenedor Principal -->
    <div class="container py-5">
        <form class="form-modificar col-12 col-md-6 col-lg-4 mx-auto" method="POST">
            <h3 class="text-center text-secondary mb-4">Modificar Modelo</h3>
            <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">

            <?php
            include "controlador/modificar_modelo.php";
            while ($datos = $sql->fetch_object()) { ?>
                <div class="mb-3">
                    <label for="caracteristicas_modelo" class="form-label">Características Modelo</label>
                    <input type="text" class="form-control" name="Caracteristicas_Modelo"
                        value="<?= htmlspecialchars($datos->Caracteristicas_Modelo) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="accesorios_modelo" class="form-label">Accesorios Modelo</label>
                    <input type="text" class="form-control" name="Accesorios_Modelo"
                        value="<?= htmlspecialchars($datos->Accesorios_Modelo) ?>" required>
                </div>
            <?php } ?>

            <!-- Botón para modificar -->
            <button type="submit" class="btn btn-primary btn-modificar w-100" name="btnmodificar"
                value="ok">Modificar</button>
            <a href="../modelo/comprobar_modelo.php" class="btn btn-secondary w-100 mt-3">Regresar</a>
        </form>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>