<?php
include('../conexion/conexion.php');
if (!empty($_POST["btnregistrar"])) {
    if (!empty($_POST["Fecha_Prestamo_Equipo"]) && !empty($_POST["Fecha_entrega_prestamo"]) && !empty($_POST["Id_Usuario"]) && !empty($_POST["Id_Equipos"]) && !empty($_POST["Id_Ubicacion"]) && !empty($_POST["Id_Estado_Equipo"])) {
        
        $Fecha_Prestamo_Equipo = $_POST["Fecha_Prestamo_Equipo"];
        $Fecha_entrega_prestamo = $_POST["Fecha_entrega_prestamo"];
        $Id_Usuario  = $_POST["Id_Usuario"];
        $Id_Equipos = $_POST["Id_Equipos"];
        $Id_Ubicacion  = $_POST["Id_Ubicacion"];
        $Id_Estado_Equipo  = $_POST["Id_Estado_Equipo"];
   

        $sql = $conexion->query(" insert into prestamo_equipo(Fecha_Prestamo_Equipo,Fecha_entrega_prestamo,Id_Usuario,Id_Equipos,Id_Ubicacion,Id_Estado_Equipo) values('$Fecha_Prestamo_Equipo','$Fecha_entrega_prestamo','$Id_Usuario','$Id_Equipos','$Id_Ubicacion','$Id_Estado_Equipo')");
        if ($sql == 1) {
            echo '<div class="alert alert-success">Prestamo Registrado Correctamente</div>';
        } else {
            echo '<div class="alert alert-danger">Error al registrar</div>';
        }

    } else {
        echo '<div class="alert alert-success">Algunos de los campos esta vacio</div>';
        ;
    }
}
?>