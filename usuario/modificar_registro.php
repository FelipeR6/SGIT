<?php
include "modelo/conexion.php";
$id=$_GET["id"];
$sql=$conexion->query("SELECT * from usuario where Id_Usuario=$id");

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
    include "controlador/modificar_persona.php";
    while ($datos = $sql->fetch_object()) { ?>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Primer Nombre</label>
            <input type="text" class="form-control" name="Nombre_Usuario_1" value="<?= htmlspecialchars($datos->Nombre_Usuario_1) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Segundo Nombre</label>
            <input type="text" class="form-control" name="Nombre_Usuario_2" value="<?= htmlspecialchars($datos->Nombre_Usuario_2) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Primer Apellido</label>
            <input type="text" class="form-control" name="Apellidos_Usuario_1" value="<?= htmlspecialchars($datos->Apellidos_Usuario_1) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Segundo Apellido</label>
            <input type="text" class="form-control" name="Apellidos_Usuario_2" value="<?= htmlspecialchars($datos->Apellidos_Usuario_2) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Celular 1</label>
            <input type="text" class="form-control" name="Telefono_1_Usuario" value="<?= htmlspecialchars($datos->Telefono_1_Usuario) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Telefono 2</label>
            <input type="text" class="form-control" name="Telefono_2_Usuario" value="<?= htmlspecialchars($datos->Telefono_2_Usuario) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Correo</label>
            <input type="email" class="form-control" name="Correo_Usuario" value="<?= htmlspecialchars($datos->Correo_Usuario) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Contraseña</label>
            <input type="password" class="form-control" name="Contraseña_Usuario" value="<?= htmlspecialchars($datos->Contraseña_Usuario) ?>">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Rol</label>
            <input type="text" class="form-control" name="Id_Rol" value="<?= htmlspecialchars($datos->Id_Rol) ?>">
        </div>
    <?php } ?>

    <button type="submit" class="btn btn-primary" name="btnmodificar" value="ok">Modificar</button>
</form>

</body>
</html>