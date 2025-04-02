<?php
include('../conexion/conexion.php');

if (!empty($_POST["btnmodificar"])) {
    if (!empty($_POST["id"]) && !empty($_POST["Caracteristicas_Modelo"]) && !empty($_POST["Accesorios_Modelo"])) {
        
        $id = $_POST["id"];
        $Caracteristicas_Modelo = $_POST["Caracteristicas_Modelo"];
        $Accesorios_Modelo = $_POST["Accesorios_Modelo"];

        $sql = $conexion->query("UPDATE modelo
            SET Caracteristicas_Modelo='$Caracteristicas_Modelo',
                Accesorios_Modelo='$Accesorios_Modelo'
            WHERE Id_Modelo=$id");

        if ($sql) {
            header("Location:modelo.php");
        } else {
            echo '<div class="alert alert-danger">Error al Modificar</div>';
        }
    } else {
        echo "<div class='alert alert-warning'>Campos Vacíos</div>";
    }
}
?>
