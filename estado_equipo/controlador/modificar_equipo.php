<?php
include "modelo/conexion.php";

if (!empty($_POST["btnmodificar"])) {
    if (!empty($_POST["id"]) && !empty($_POST["Estado_Entregado"]) && !empty($_POST["Estado_Recibido"])) {
        
        $id = $_POST["id"];
        $Estado_Entregado = $_POST["Estado_Entregado"];
        $Estado_Recibido = $_POST["Estado_Recibido"];

        $sql = $conexion->query("UPDATE estado_equipo 
            SET Estado_Entregado='$Estado_Entregado ',
                Estado_Recibido='$Estado_Recibido '
            WHERE Id_Equipo=$id ");

        if ($sql) {
            header("Location:estado_equipo.php");
        } else {
            echo '<div class="alert alert-danger">Error al Modificar</div>';
        }
    } else {
        echo "<div class='alert alert-warning'>Campos Vacíos</div>";
    }
}
?>
