<?php

if (!empty($_POST["btnregistrar"])) {
    if (!empty($_POST["Fecha_Inicio_mantenimiento"]) && !empty($_POST["Fecha_fin_mantenimiento"]) && !empty($_POST["Observaciones"]) && !empty($_POST["Id_Equipos"]) && !empty($_POST["Id_Usuario"])) {
        
        $Fecha_Inicio_mantenimiento = $_POST["Fecha_Inicio_mantenimiento"];
        $Fecha_fin_mantenimiento = $_POST["Fecha_fin_mantenimiento"];
        $Observaciones = $_POST["Observaciones"];
        $Id_Equipos = $_POST["Id_Equipos"];
        $Id_Usuario = $_POST["Id_Usuario"];
   
        $sql = $conexion->query("INSERT INTO mantenimiento (Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento, Observaciones, Id_Equipos, Id_Usuario) VALUES
        ('$Fecha_Inicio_mantenimiento',
        '$Fecha_fin_mantenimiento',
        '$Observaciones',
        '$Id_Equipos',
        '$Id_Usuario')");
        
        if ($sql) {
            echo '<div class="alert alert-success">Mantenimiento Registrado Correctamente</div>';
        } else {
            echo '<div class="alert alert-danger">Error al registrar</div>';
        }

    } else {
        echo '<div class="alert alert-warning">Algunos de los campos están vacíos</div>';
    }
}
?>