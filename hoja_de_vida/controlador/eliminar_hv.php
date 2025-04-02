<?php
if (!empty($_GET["id"])) {
    $id = $_GET["id"];
    $sql = $conexion->query("DELETE FROM hoja_vida_equipo WHERE Id_Hoja_vida_equipo = $id");

    if ($sql) {
        echo "<div class='alert alert-success'>Hoja de Vida Eliminada Correctamente</div>";
    } else {
        echo "<div class='alert alert-warning'>Error al Eliminar</div>";
    }
}
?>
