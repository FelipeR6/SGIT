<?php

if (!empty($_POST["btnregistrar"])) {
    if (!empty($_POST["Nombre_Usuario_1"]) && !empty($_POST["Nombre_Usuario_2"]) && !empty($_POST["Apellidos_Usuario_1"]) && !empty($_POST["Apellidos_Usuario_2"]) && !empty($_POST["Telefono_1_Usuario"]) && !empty($_POST["Telefono_2_Usuario"]) && !empty($_POST["Correo_Usuario"]) && !empty($_POST["Contraseña_Usuario"])) {
        $Nombre_Usuario_1 = $_POST["Nombre_Usuario_1"];
        $Nombre_Usuario_2 = $_POST["Nombre_Usuario_2"];
        $Apellidos_Usuario_1 = $_POST["Apellidos_Usuario_1"];
        $Apellidos_Usuario_2 = $_POST["Apellidos_Usuario_2"];
        $Telefono_1_Usuario = $_POST["Telefono_1_Usuario"];
        $Telefono_2_Usuario = $_POST["Telefono_2_Usuario"];
        $Correo_Usuario = $_POST["Correo_Usuario"];
        $Contraseña_Usuario = $_POST["Contraseña_Usuario"];
        $Id_Rol = $_POST["Id_Rol"];
   

        $sql = $conexion->query(" insert into usuario(Nombre_Usuario_1,Nombre_Usuario_2,Apellidos_Usuario_1,Apellidos_Usuario_2,Telefono_1_Usuario,Telefono_2_Usuario,Correo_Usuario,Contraseña_Usuario) values('$Nombre_Usuario_1','$Nombre_Usuario_2','$Apellidos_Usuario_1','$Apellidos_Usuario_2','$Telefono_1_Usuario','$Telefono_2_Usuario','$Correo_Usuario','$Contraseña_Usuario')");
        if ($sql == 1) {
            echo '<div class="alert alert-success">Persona Registrado Correctamente</div>';
        } else {
            echo '<div class="alert alert-danger">Error al registrar</div>';
        }

    } else {
        echo '<div class="alert alert-success">Algunos de los campos esta vacio</div>';
        ;
    }
}
?>