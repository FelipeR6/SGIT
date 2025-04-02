<?php
include('../conexion/conexion.php');

if (!empty($_POST["btnregistrar"])) {
    if (
        !empty($_POST["Id_Equipos"]) &&
        !empty($_POST["Estado_Equipo"]) &&
        !empty($_POST["Id_usuario"]) &&
        !empty($_POST["Fecha_ingreso"])
    ) {

        $Id_Equipos = $_POST["Id_Equipos"];
        $Estado_Equipo = $_POST["Estado_Equipo"];
        $Id_usuario = $_POST["Id_usuario"];
        $Fecha_ingreso = $_POST["Fecha_ingreso"];

        $sql = $conexion->query("INSERT INTO hoja_vida_equipo (Id_Equipos, Estado_Equipo, Id_usuario, Fecha_ingreso) VALUES
        ('$Id_Equipos',
        '$Estado_Equipo',
        '$Id_usuario',
        '$Fecha_ingreso')");

        if ($sql) {
            echo '<div class="alert alert-success">Hoja de Vida Registrada Correctamente</div>';
        } else {
            echo '<div class="alert alert-danger">Error al registrar</div>';
        }

    } else {
        echo '<div class="alert alert-warning">Algunos de los campos están vacíos</div>';
    }
}
?>