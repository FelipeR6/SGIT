<?php
include('../conexion/conexion.php');

if (!empty($_POST["btnmodificar"])) {
    if (!empty($_POST["id"]) && !empty($_POST["Fecha_Prestamo_Equipo"]) && !empty($_POST["Fecha_entrega_prestamo"]) && !empty($_POST["Id_Usuario"]) && !empty($_POST["Id_Equipos"]) && !empty($_POST["Id_Ubicacion"]) && !empty($_POST["Id_Estado_Equipo"])) {

        $id = $_POST["id"];
        $Fecha_Prestamo_Equipo = $_POST["Fecha_Prestamo_Equipo"];
        $Fecha_entrega_prestamo = $_POST["Fecha_entrega_prestamo"];
        $Id_Usuario  = $_POST["Id_Usuario"];
        $Id_Equipos = $_POST["Id_Equipos"];
        $Id_Ubicacion  = $_POST["Id_Ubicacion"];
        $Id_Estado_Equipo  = $_POST["Id_Estado_Equipo"];

        $sql = $conexion->query("UPDATE prestamo_equipo  
            SET Fecha_Prestamo_Equipo='$Fecha_Prestamo_Equipo',
                Fecha_entrega_prestamo='$Fecha_entrega_prestamo',
                Id_Usuario ='$Id_Usuario',
                Id_Equipos ='$Id_Equipos',
                Id_Ubicacion ='$Id_Ubicacion',
                Id_Estado_Equipo ='$Id_Estado_Equipo' 
            WHERE Id_Prestamo_Equipo=$id");

        if ($sql) {
            header("Location:../prestamo equipo/comprobar_prestamo.php");
        } else {
            echo '<div class="alert alert-danger">Error al Modificar</div>';
        }
    } else {
        echo "<div class='alert alert-warning'>Campos Vacíos</div>";
    }
}
