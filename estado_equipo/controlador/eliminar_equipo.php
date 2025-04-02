<?php
    if (!empty($_GET["id"])) {
       $id=$_GET["id"];
       $sql=$conexion->query(" delete from equipo where Id_Equipos=$id");
       if ($sql==1) {
        echo"<div class='alert alert-success'>Equipo Eliminado Correctamente</div>";
     } else {
        echo"<div class='alert alert-warning'>Error al Eliminar</div>";
       }
    }
?>