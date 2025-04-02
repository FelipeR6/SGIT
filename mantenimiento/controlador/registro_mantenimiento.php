<?php

include('../conexion/conexion.php');


if (!empty($_POST["btnregistrar"])) {
    if (!empty($_POST["Fecha_Inicio_mantenimiento"]) && !empty($_POST["Fecha_fin_mantenimiento"]) && !empty($_POST["Observaciones"]) && !empty($_POST["Id_Equipos"]) && !empty($_POST["Id_Usuario"])) {
        
        $Fecha_Inicio_mantenimiento = $_POST["Fecha_Inicio_mantenimiento"];
        $Fecha_fin_mantenimiento = $_POST["Fecha_fin_mantenimiento"];
        $Observaciones = $_POST["Observaciones"];
        $Id_Equipos = $_POST["Id_Equipos"];
        $Id_Usuario = $_POST["Id_Usuario"];

        $fechaInicioValida = DateTime::createFromFormat('Y-m-d', $Fecha_Inicio_mantenimiento);
        $fechaFinValida = DateTime::createFromFormat('Y-m-d', $Fecha_fin_mantenimiento);
        
        if (!$fechaInicioValida || !$fechaFinValida) {
            echo '<div class="alert alert-warning">Formato de fecha no válido</div>';
        } elseif ($fechaInicioValida > $fechaFinValida) {
            echo '<div class="alert alert-warning">La fecha de inicio debe ser anterior a la fecha de fin</div>';
        } else {
            $stmt = $conexion->prepare("INSERT INTO mantenimiento (Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento, Observaciones, Id_Equipos, Id_Usuario) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssis", $Fecha_Inicio_mantenimiento, $Fecha_fin_mantenimiento, $Observaciones, $Id_Equipos, $Id_Usuario);
            
            if ($stmt->execute()) {
                echo '<div class="alert alert-success">Mantenimiento Registrado Correctamente</div>';
            } else {
                echo '<div class="alert alert-danger">Error al registrar: ' . $stmt->error . '</div>';
            }

            $stmt->close();
        }
    } else {
        echo '<div class="alert alert-warning">Algunos de los campos están vacíos</div>';
    }
}
?>
