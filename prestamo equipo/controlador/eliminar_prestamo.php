<?php
    if (!empty($_GET["id"])) {
       $id=$_GET["id"];
       $sql=$conexion->query(" delete from prestamo_equipo  where Id_Prestamo_Equipo =$id");
       if ($sql==1) {
        echo"<div class='alert alert-success'>Prestamo Eliminado Correctamente</div>";
     } else {
        echo"<div class='alert alert-warning'>Error al Eliminar</div>";
       }
    }
?>