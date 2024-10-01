<?php
include "modelo/conexion.php";
$id=$_GET["id"];
$sql=$conexion->query("SELECT * from prestamo_equipo where Id_Prestamo_Equipo=$id");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Modificar</title>
</head>
<body>
<form class="col-4 p-3 m-auto" method="POST">
    <h3 class="text-center text-secondary">Modificar</h3>
    <input type="hidden" name="id" value="<?= htmlspecialchars($_GET["id"]) ?>">

    <?php
    include "controlador/modificar_prestamo.php";
    while ($datos = $sql->fetch_object()) { ?>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Fecha Prestamo Equipo</label>
            <input type="date" class="form-control" name="Fecha_Prestamo_Equipo" value="<?= htmlspecialchars($datos->Fecha_Prestamo_Equipo) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Fecha entrega prestamo</label>
            <input type="date" class="form-control" name="Fecha_entrega_prestamo" value="<?= htmlspecialchars($datos->Fecha_entrega_prestamo) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Id Usuario </label>
            <input type="text" class="form-control" name="Id_Usuario" value="<?= htmlspecialchars($datos->Id_Usuario) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Id Equipos</label>
            <input type="text" class="form-control" name="Id_Equipos" value="<?= htmlspecialchars($datos->Id_Equipos) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Id Ubicacion</label>
            <input type="text" class="form-control" name="Id_Ubicacion" value="<?= htmlspecialchars($datos->Id_Ubicacion) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Id Estado Equipo</label>
            <input type="text" class="form-control" name="Id_Estado_Equipo" value="<?= htmlspecialchars($datos->Id_Estado_Equipo) ?>">
        </div>
    <?php } ?>

    <button type="submit" class="btn btn-primary" name="btnmodificar" value="ok">Modificar</button>
</form>

</body>
</html>