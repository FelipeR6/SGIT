<?php

if (!empty($_POST["btnregistrar"])) {
    if (!empty($_POST["Nombre_Categoria"])) {
        
        $Nombre_Categoria = $_POST["Nombre_Categoria"];
        

        $sql = $conexion->query(" insert into categoria(Nombre_Categoria) values('$Nombre_Categoria')");
        if ($sql == 1) {
            echo '<div class="alert alert-success">Categoria Registrado Correctamente</div>';
        } else {
            echo '<div class="alert alert-danger">Error al registrar</div>';
        }

    } else {
        echo '<div class="alert alert-success">Algunos de los campos esta vacio</div>';
        ;
    }
}
?>