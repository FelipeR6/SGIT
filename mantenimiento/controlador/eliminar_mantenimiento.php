<?php
if (!empty($_GET["id"])) {
    $id = $_GET["id"];
    $sql = $conexion->query("DELETE FROM mantenimiento WHERE Id_Mantenimiento = $id");

    if ($sql) {
        echo "<div class='alert alert-success'>Mantenimiento Eliminado Correctamente</div>";
    } else {
        echo "<div class='alert alert-warning'>Error al Eliminar</div>";
    }
}
?>
