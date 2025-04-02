<?php
include('../conexion/conexion.php');
if (!empty($_POST["btnregistrar"])) {
    if (!empty($_POST["Nombre_Ubicacion"]) && !empty($_POST["Prestamo_disponible"])) {
        
        $Nombre_Ubicacion = $_POST["Nombre_Ubicacion"];
        $Prestamo_disponible= $_POST["Prestamo_disponible"];
   

        $sql = $conexion->query(" insert into ubicacion(Nombre_Ubicacion,Prestamo_disponible) values('$Nombre_Ubicacion','$Prestamo_disponible')");
        if ($sql == 1) {
            echo '<div class="alert alert-success">Ubicacion Registrada Correctamente</div>';
        } else {
            echo '<div class="alert alert-danger">Error al registrar</div>';
        }

    } else {
        echo '<div class="alert alert-success">Algunos de los campos esta vacio</div>';
        ;
    }
}
?>