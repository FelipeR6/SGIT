<?php
include('../conexion/conexion.php');

if (!empty($_POST["btnmodificar"])) {
    if (
        !empty($_POST["id"]) &&
        !empty($_POST["Id_Equipos"]) &&
        !empty($_POST["Estado_Equipo"]) &&
        !empty($_POST["Id_usuario"]) &&
        !empty($_POST["Fecha_ingreso"])
    ) {

        $id = $_POST["id"];
        $Id_Equipos = $_POST["Id_Equipos"];
        $Estado_Equipo = $_POST["Estado_Equipo"];
        $Id_usuario = $_POST["Id_usuario"];
        $Fecha_ingreso = $_POST["Fecha_ingreso"];

        $sql = $conexion->query("UPDATE hoja_vida_equipo 
            SET Id_Equipos='$Id_Equipos',
                Estado_Equipo='$Estado_Equipo',
                Id_usuario='$Id_usuario',
                Fecha_ingreso='$Fecha_ingreso'
            WHERE Id_Hoja_vida_equipo=$id");

        if ($sql) {
            header("Location:hoja_de_vida.php");
            exit();
        } else {
            echo '<div class="alert alert-danger">Error al Modificar</div>';
        }
    } else {
        echo "<div class='alert alert-warning'>Campos Vacíos</div>";
    }
}
?>