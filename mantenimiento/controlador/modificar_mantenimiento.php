<?php
include('../conexion/conexion.php');


if (!empty($_POST["btnmodificar"])) {
    if (!empty($_POST["id"]) && !empty($_POST["Fecha_Inicio_mantenimiento"]) && !empty($_POST["Fecha_fin_mantenimiento"]) && !empty($_POST["Observaciones"]) && !empty($_POST["Id_Equipos"]) && !empty($_POST["Id_Usuario"])) {
        
        $id = $_POST["id"];
        $Fecha_Inicio_mantenimiento = $_POST["Fecha_Inicio_mantenimiento"];
        $Fecha_fin_mantenimiento = $_POST["Fecha_fin_mantenimiento"];
        $Observaciones = $_POST["Observaciones"];
        $Id_Equipos = $_POST["Id_Equipos"];
        $Id_Usuario = $_POST["Id_Usuario"];

        $sql = $conexion->query("UPDATE mantenimiento 
            SET Fecha_Inicio_mantenimiento='$Fecha_Inicio_mantenimiento',
                Fecha_fin_mantenimiento='$Fecha_fin_mantenimiento',
                Observaciones='$Observaciones',
                Id_Equipos='$Id_Equipos',
                Id_Usuario='$Id_Usuario'
            WHERE Id_Mantenimiento=$id");

        if ($sql) {
            header("Location:mantenimiento.php");
        } else {
            echo '<div class="alert alert-danger">Error al Modificar</div>';
        }
    } else {
        echo "<div class='alert alert-warning'>Campos Vacíos</div>";
    }
}
?>
