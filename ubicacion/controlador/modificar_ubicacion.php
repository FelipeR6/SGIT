<?php
include "ubicacion/conexion.php";

if (!empty($_POST["btnmodificar"])) {
    if (!empty($_POST["id"]) && !empty($_POST["Nombre_Ubicacion"]) && !empty($_POST["Prestamo_Disponible"])) {
        
        $id = $_POST["id"];
        $Nombre_Ubicacion = $_POST["Nombre_Ubicacion"];
        $Prestamo_disponible = $_POST["Prestamo_Disponible"];

        $sql = $conexion->query("UPDATE ubicacion
            SET Nombre_Ubicacion='$Nombre_Ubicacion',
                Prestamo_Disponible='$Prestamo_disponible'
            WHERE Id_Ubicacion=$id");

        if ($sql) {
            header("Location:ubicacion.php");
        } else {
            echo '<div class="alert alert-danger">Error al Modificar</div>';
        }
    } else {
        echo "<div class='alert alert-warning'>Campos Vacíos</div>";
    }
}
?>
