<?php
include('../conexion/conexion.php');

if (!empty($_POST["btnregistrar"])) {
    if (!empty($_POST["Marca_Equipo"]) && !empty($_POST["Año_Equipo"]) && !empty($_POST["Id_Categoria"]) && !empty($_POST["Id_Modelo"]) && !empty($_POST["Id_Usuario"])) {
        
        $Marca_Equipo = $_POST["Marca_Equipo"];
        $Año_Equipo = $_POST["Año_Equipo"];
        $Id_Categoria  = $_POST["Id_Categoria"];
        $Id_Modelo = $_POST["Id_Modelo"];
        $Id_Usuario = $_POST["Id_Usuario"];

        // Verificar que Id_Categoria existe
        $result = $conexion->query("SELECT * FROM categoria WHERE Id_Categoria = '$Id_Categoria'");
        if ($result->num_rows == 0) {
            echo '<div class="alert alert-danger">La categoría no existe.</div>';
            exit;
        }
        $result = $conexion->query("SELECT * FROM modelo WHERE Id_Modelo = '$Id_Modelo'");
        if ($result->num_rows == 0) {
            echo '<div class="alert alert-danger">El modelo no existe.</div>';
            exit;
        }

        $result = $conexion->query("SELECT * FROM usuario WHERE Id_Usuario = '$Id_Usuario'");
        if ($result->num_rows == 0) {
            echo '<div class="alert alert-danger">El usuario no existe.</div>';
            exit;
        }

        $sql = $conexion->query("INSERT INTO equipo(Marca_Equipo, Año_Equipo, Id_Categoria, Id_Modelo, Id_Usuario) VALUES
        ('$Marca_Equipo', '$Año_Equipo', '$Id_Categoria', '$Id_Modelo', '$Id_Usuario')");
        
        if ($sql) {
            echo '<div class="alert alert-success">Equipo Registrado Correctamente</div>';
        } else {
            echo '<div class="alert alert-danger">Error al registrar: ' . $conexion->error . '</div>';
        }

    } else {
        echo '<div class="alert alert-warning">Algunos de los campos están vacíos</div>';
    }
}
?>
