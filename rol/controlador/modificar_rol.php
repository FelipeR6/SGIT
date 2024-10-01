<?php
include "rol/conexion.php";

if (!empty($_POST["btnmodificar"])) {
    if (!empty($_POST["id"]) && !empty($_POST["Nombre_Rol"])) {
        
        $id = $_POST["id"];
        $Nombre_Rol = $_POST["Nombre_Rol"];

        $sql = $conexion->query("UPDATE rol
            SET Nombre_Rol='$Nombre_Rol'
            WHERE Id_Rol=$id");

        if ($sql==1) {
            header("Location:rol.php");
        } else {
            echo '<div class="alert alert-danger">Error al Modificar</div>';
        }
    } else {
        echo "<div class='alert alert-warning'>Campos Vacíos</div>";
    }
}
?>
