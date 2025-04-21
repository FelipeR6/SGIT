<?php
include('../conexion/conexion.php');
$id = $_GET["id"];
$sql = $conexion->query("SELECT * FROM prestamo_equipo WHERE Id_Prestamo_Equipo = $id");
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Modificar Préstamo de Equipo</title>
    <link rel="stylesheet" href="../css/crud.css">
</head>
<body>
    <!-- Contenedor Principal -->
    <div class="container py-5">
        <form class="form-modificar col-12 col-md-6 col-lg-4 mx-auto" method="POST">
            <h3 class="text-center text-secondary mb-4">Modificar Préstamo de Equipo</h3>
            <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">

            <?php
            include "controlador/modificar_prestamo.php";
            while ($datos = $sql->fetch_object()) { ?>
                <div class="mb-3">
                    <label for="Fecha_Prestamo_Equipo" class="form-label">Fecha Préstamo Equipo</label>
                    <input type="date" class="form-control" name="Fecha_Prestamo_Equipo" value="<?= htmlspecialchars($datos->Fecha_Prestamo_Equipo) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Fecha_entrega_prestamo" class="form-label">Fecha Entrega Préstamo</label>
                    <input type="date" class="form-control" name="Fecha_entrega_prestamo" value="<?= htmlspecialchars($datos->Fecha_entrega_prestamo) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Id_Usuario" class="form-label">ID Usuario</label>
                    <input type="text" class="form-control" name="Id_Usuario" value="<?= htmlspecialchars($datos->Id_Usuario) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Id_Equipos" class="form-label">ID Equipos</label>
                    <input type="text" class="form-control" name="Id_Equipos" value="<?= htmlspecialchars($datos->Id_Equipos) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Id_Ubicacion" class="form-label">ID Ubicación</label>
                    <input type="text" class="form-control" name="Id_Ubicacion" value="<?= htmlspecialchars($datos->Id_Ubicacion) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Id_Estado_Equipo" class="form-label">ID Estado Equipo</label>
                    <input type="text" class="form-control" name="Id_Estado_Equipo" value="<?= htmlspecialchars($datos->Id_Estado_Equipo) ?>" required>
                </div>
            <?php } ?>

            <!-- Botón para modificar -->
            <button type="submit" class="btn btn-primary w-100" name="btnmodificar" value="ok">Modificar</button>
            <a href="../prestamo equipo/comprobar_prestamo.php" class="btn btn-secondary w-100 mt-3">Regresar</a>
        </form>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.
