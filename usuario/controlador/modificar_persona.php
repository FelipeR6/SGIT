<?php
include('../conexion/conexion.php');

if (!empty($_POST["btnmodificar"])) {
    if (!empty($_POST["id"]) && 
        !empty($_POST["Nombre_Usuario_1"]) && 
        !empty($_POST["Nombre_Usuario_2"]) && 
        !empty($_POST["Apellidos_Usuario_1"]) && 
        !empty($_POST["Apellidos_Usuario_2"]) && 
        !empty($_POST["Telefono_1_Usuario"]) && 
        !empty($_POST["Telefono_2_Usuario"]) && 
        !empty($_POST["Correo_Usuario"]) && 
        !empty($_POST["Contraseña"]) && 
        !empty($_POST["Id_Rol"])) {
        
        $id = $_POST["id"];
        $Nombre_Usuario_1 = $_POST["Nombre_Usuario_1"];
        $Nombre_Usuario_2 = $_POST["Nombre_Usuario_2"];
        $Apellidos_Usuario_1 = $_POST["Apellidos_Usuario_1"];
        $Apellidos_Usuario_2 = $_POST["Apellidos_Usuario_2"];
        $Telefono_1_Usuario = $_POST["Telefono_1_Usuario"];
        $Telefono_2_Usuario = $_POST["Telefono_2_Usuario"];
        $Correo_Usuario = $_POST["Correo_Usuario"];
        $Contraseña = password_hash($_POST["Contraseña"], PASSWORD_DEFAULT);
        $Id_Rol = $_POST["Id_Rol"];

        $stmt = $conexion->prepare("UPDATE usuario 
            SET Nombre_Usuario_1=?, 
                Nombre_Usuario_2=?, 
                Apellidos_Usuario_1=?, 
                Apellidos_Usuario_2=?, 
                Telefono_1_Usuario=?, 
                Telefono_2_Usuario=?, 
                Correo_Usuario=?, 
                Contraseña=?, 
                Id_Rol=? 
            WHERE Id_Usuario=?");

        if ($stmt) {
            $stmt->bind_param("ssssssssis", $Nombre_Usuario_1, $Nombre_Usuario_2, $Apellidos_Usuario_1, $Apellidos_Usuario_2, $Telefono_1_Usuario, $Telefono_2_Usuario, $Correo_Usuario, $Contraseña, $Id_Rol, $id);

            if ($stmt->execute()) {
                header("Location:comprobar_registro.php");
                exit;
            } else {
                echo '<div class="alert alert-danger">Error al Modificar</div>';
            }
            $stmt->close();
        } else {
            echo '<div class="alert alert-danger">Error en la preparación de la consulta</div>';
        }
    } else {
        echo "<div class='alert alert-warning'>Campos Vacíos</div>";
    }
}
?>
