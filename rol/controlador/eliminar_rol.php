<?php
    if (!empty($_GET["id"])) {
       $id=$_GET["id"];
       $sql=$conexion->query(" delete from rol where Id_Rol=$id");
       if ($sql==1) {
        echo"<div class='alert alert-success'>Rol Eliminada Correctamente</div>";
     } else {
        echo"<div class='alert alert-warning'>Error al Eliminar</div>";
       }
    }
?>