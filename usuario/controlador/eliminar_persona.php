<?php
    if (!empty($_GET["id"])) {
       $id=$_GET["id"];
       $sql=$conexion->query(" delete from usuario where id_usuario=$id");
       if ($sql==1) {
        echo"<div class='alert alert-success'>Persona Eliminada Correctamente</div>";
     } else {
        echo"<div class='alert alert-warning'>Error al Eliminar</div>";
       }
    }
?>