<?php
    if (!empty($_GET["id"])) {
       $id=$_GET["id"];
       $sql=$conexion->query(" delete from categoria where Id_Categoria=$id");
       if ($sql==1) {
        echo"<div class='alert alert-success'>Categoria Eliminada Correctamente</div>";
     } else {
        echo"<div class='alert alert-warning'>Error al Eliminar</div>";
       }
    }
?>