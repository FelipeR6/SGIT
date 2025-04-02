<?php
include('../conexion/conexion.php');

if (!empty($_GET["id"])) {
    $id = $_GET["id"];
    
    $sql = $conexion->query("DELETE FROM prestamo_equipo WHERE Id_Usuario = $id");
    
    $sql = $conexion->query("DELETE FROM usuario WHERE id_usuario = $id");
    
    if ($sql) {
        echo "<div class='alert alert-success'>Persona Eliminada Correctamente</div>";
    } else {
        echo "<div class='alert alert-warning'>Error al Eliminar</div>";
    }
}
?>
