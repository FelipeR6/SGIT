<?php
    if (!empty($_GET["id"])) {
       $id=$_GET["id"];
       $sql=$conexion->query(" delete from ubicacion where Id_Ubicacion=$id");
       if ($sql==1) {
        echo"<div class='alert alert-success'>Ubicacion Eliminada Correctamente</div>";
     } else {
        echo"<div class='alert alert-warning'>Error al Eliminar</div>";
       }
    }
?>