<?php
include('../conexion/conexion.php');

if (!empty($_POST["btnregistrar"])) {
    if (!empty($_POST["Caracteristicas_Modelo"]) && !empty($_POST["Accesorios_Modelo"])) {
        
        $Caracteristicas_Modelo = $_POST["Caracteristicas_Modelo"];
        $Accesorios_Modelo = $_POST["Accesorios_Modelo"];
   

        $sql = $conexion->query(" insert into modelo(Caracteristicas_Modelo,Accesorios_Modelo) values('$Caracteristicas_Modelo','$Accesorios_Modelo')");
        if ($sql == 1) {
            echo '<div class="alert alert-success">Modelo Registrado Correctamente</div>';
        } else {
            echo '<div class="alert alert-danger">Error al registrar</div>';
        }

    } else {
        echo '<div class="alert alert-success">Algunos de los campos esta vacio</div>';
        ;
    }
}
?>