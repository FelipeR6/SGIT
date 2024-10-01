<?php
include "rol/conexion.php";
$id=$_GET["id"];
$sql=$conexion->query("SELECT * from rol where Id_Rol=$id");

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
    include "controlador/modificar_rol.php";
    while ($datos = $sql->fetch_object()) { ?>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nombre Rol</label>
            <input type="text" class="form-control" name="Nombre_Rol" value="<?= htmlspecialchars($datos->Nombre_Rol) ?>">
        </div>
        
    <?php } ?>

    <button type="submit" class="btn btn-primary" name="btnmodificar" value="ok">Modificar</button>
</form>

</body>
</html>