<?php

if (!empty($_POST["btnAgregarEstado"])) {
    if (!empty($_POST["Estado_Entregado"]) && !empty($_POST["Estado_Recibido"])) {
        
        $estadoEntregado = $_POST["Estado_Entregado"];
        $estadoRecibido = $_POST["Estado_Recibido"];
   

        $sql = $conexion->query(" insert into equipo(Estado_Entregado,Estado_Recibido,Id_Categoria,Id_Modelo,Id_Usuario) values
        ('$estadoEntregado',
        '$estadoRecibido')");
        if ($sql == 1) {
            echo '<div class="alert alert-success">Equipo Registrado Correctamente</div>';
        } else {
            echo '<div class="alert alert-danger">Error al registrar</div>';
        }

    } else {
        echo '<div class="alert alert-success">Algunos de los campos esta vacio</div>';
        ;
    }
}
?>