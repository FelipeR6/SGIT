<?php

if (!empty($_POST["btnregistrar"])) {
    if (!empty($_POST["Nombre_Rol"])) {
        
        $Nombre_Rol = $_POST["Nombre_Rol"];
        
   

        $sql = $conexion->query(" insert into rol(Nombre_Rol) values('$Nombre_Rol')");
        if ($sql ==1) {
            echo '<div class="alert alert-success">Rol Registrado Correctamente</div>';
        } else {
            echo '<div class="alert alert-danger">Error al registrar</div>';
        }

    } else {
        echo '<div class="alert alert-success">Algunos de los campos esta vacio</div>';
        ;
    }
}
?>