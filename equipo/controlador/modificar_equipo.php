<?php
include('../conexion/conexion.php');

if (!empty($_POST["btnmodificar"])) {
    if (!empty($_POST["id"]) && !empty($_POST["Marca_Equipo"]) && !empty($_POST["Año_Equipo"]) && !empty($_POST["Id_Categoria"]) && !empty($_POST["Id_Modelo"]) && !empty($_POST["Id_Usuario"])) {
        
        $id = $_POST["id"];
        $Marca_Equipo = $_POST["Marca_Equipo"];
        $Año_Equipo = $_POST["Año_Equipo"];
        $Id_Categoria  = $_POST["Id_Categoria"];
        $Id_Modelo = $_POST["Id_Modelo"];
        $Id_Usuario = $_POST["Id_Usuario"];

        $sql = $conexion->query("UPDATE equipo 
            SET Marca_Equipo='$Marca_Equipo ',
                Año_Equipo='$Año_Equipo ',
                Id_Categoria='$Id_Categoria ',
                Id_Modelo='$Id_Modelo ',
                Id_Usuario='$Id_Usuario '
            WHERE Id_Equipos=$id ");

        if ($sql) {
            header("Location:equipo.php");
        } else {
            echo '<div class="alert alert-danger">Error al Modificar</div>';
        }
    } else {
        echo "<div class='alert alert-warning'>Campos Vacíos</div>";
    }
}
?>
