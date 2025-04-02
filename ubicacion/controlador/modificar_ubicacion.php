<?php
include('../conexion/conexion.php');

if (!empty($_POST["btnmodificar"])) {
    if (!empty($_POST["id"]) && !empty($_POST["Nombre_Ubicacion"]) && !empty($_POST["Prestamo_disponible"])) {
        
        // Sanitización de datos para evitar inyección SQL
        $id = intval($_POST["id"]); // Convertir a entero para mayor seguridad
        $Nombre_Ubicacion = trim($_POST["Nombre_Ubicacion"]); 
        $Prestamo_disponible = trim($_POST["Prestamo_disponible"]);

        // Preparar la consulta para evitar SQL Injection
        $stmt = $conexion->prepare("UPDATE ubicacion SET Nombre_Ubicacion = ?, Prestamo_disponible = ? WHERE Id_Ubicacion = ?");
        $stmt->bind_param("ssi", $Nombre_Ubicacion, $Prestamo_disponible, $id);

        if ($stmt->execute()) {
            $stmt->close();
            header("Location: ubicacion.php");
            exit; // Detener ejecución
        } else {
            echo '<div class="alert alert-danger">Error al modificar</div>';
        }
    } else {
        echo "<div class='alert alert-warning'>Campos vacíos</div>";
    }
}
?>
