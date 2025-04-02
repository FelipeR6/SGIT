<?php
include('../conexion/conexion.php');
$id = $_GET["id"];
$sql = $conexion->query("SELECT * FROM equipo WHERE Id_Equipos = $id");
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Modificar Equipo</title>
</head>

<body>
    <!-- Contenedor Principal -->
    <div class="container py-5">
        <form class="form-modificar col-12 col-md-6 col-lg-4 mx-auto" method="POST">
            <h3 class="text-center text-secondary mb-4">Modificar Equipo</h3>
            <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">

            <?php
            include "controlador/modificar_equipo.php";
            while ($datos = $sql->fetch_object()) { ?>
                <div class="mb-3">
                    <label for="marcaEquipo" class="form-label">Marca Equipo</label>
                    <input type="text" class="form-control" name="Marca_Equipo" value="<?= htmlspecialchars($datos->Marca_Equipo) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="anioEquipo" class="form-label">Año del Equipo</label>
                    <input type="text" class="form-control" name="Año_Equipo" value="<?= htmlspecialchars($datos->Año_Equipo) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="idCategoria" class="form-label">ID Categoria</label>
                    <input type="text" class="form-control" name="Id_Categoria" value="<?= htmlspecialchars($datos->Id_Categoria) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="idModelo" class="form-label">ID Modelo</label>
                    <input type="text" class="form-control" name="Id_Modelo" value="<?= htmlspecialchars($datos->Id_Modelo) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="idUsuario" class="form-label">ID Usuario</label>
                    <input type="text" class="form-control" name="Id_Usuario" value="<?= htmlspecialchars($datos->Id_Usuario) ?>" required>
                </div>
            <?php } ?>

            <!-- Botón para modificar -->
            <button type="submit" class="btn btn-primary btn-modificar w-100" name="btnmodificar" value="ok">Modificar</button>
            <a href="../equipo/comprobar_equipo.php" class="btn btn-secondary w-100 mt-3">Regresar</a>
        </form>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
