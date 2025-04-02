<?php
include('../conexion/conexion.php');

    if (!empty($_GET["id"])) {
       $id=$_GET["id"];
       $sql=$conexion->query(" delete from modelo where Id_Modelo=$id");
       if ($sql==1) {
        echo"<div class='alert alert-success'>Modelo Eliminada Correctamente</div>";
     } else {
        echo"<div class='alert alert-warning'>Error al Eliminar</div>";
       }
    }
?>