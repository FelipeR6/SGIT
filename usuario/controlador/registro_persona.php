<?php
include('../conexion/conexion.php');

if (isset($_POST['btnregistrar'])) {
    $nombre1 = $conexion->real_escape_string($_POST['Nombre_Usuario_1']);
    $nombre2 = $conexion->real_escape_string($_POST['Nombre_Usuario_2']);
    $apellido1 = $conexion->real_escape_string($_POST['Apellidos_Usuario_1']);
    $apellido2 = $conexion->real_escape_string($_POST['Apellidos_Usuario_2']);
    $telefono1 = $conexion->real_escape_string($_POST['Telefono_1_Usuario']);
    $telefono2 = $conexion->real_escape_string($_POST['Telefono_2_Usuario']);
    $correo = $conexion->real_escape_string($_POST['Correo_Usuario']);
    $contraseña = password_hash($_POST['Contraseña'], PASSWORD_DEFAULT); 
    $id_rol = $conexion->real_escape_string($_POST['Id_Rol']);

    $sql = "INSERT INTO usuario (Nombre_Usuario_1, Nombre_Usuario_2, Apellidos_Usuario_1, Apellidos_Usuario_2, Telefono_1_Usuario, Telefono_2_Usuario, Correo_Usuario, Contraseña, Id_Rol) 
            VALUES ('$nombre1', '$nombre2', '$apellido1', '$apellido2', '$telefono1', '$telefono2', '$correo', '$contraseña', '$id_rol')";

    if ($conexion->query($sql) === TRUE) {
        echo "<div class='alert alert-success'>Usuario registrado correctamente.</div>";
    } else {
        echo "<div class='alert alert-danger'>Error al registrar usuario: " . $conexion->error . "</div>";
    }
}
?>