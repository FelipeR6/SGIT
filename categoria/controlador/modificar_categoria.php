<?php
include "categoria/conexion.php";

if (!empty($_POST["btnmodificar"])) {
    if (!empty($_POST["id"]) && !empty($_POST["Nombre_Categoria"])) {
        
        $id = $_POST["id"];
        $Nombre_Categoria = $_POST["Nombre_Categoria"];

        $sql = $conexion->query("UPDATE categoria
            SET Nombre_Categoria='$Nombre_Categoria'
            WHERE Id_Categoria=$id");

        if ($sql==1) {
            header("Location:categoria.php");
        } else {
            echo '<div class="alert alert-danger">Error al Modificar</div>';
        }
    } else {
        echo "<div class='alert alert-warning'>Campos Vacíos</div>";
    }
}
?>
