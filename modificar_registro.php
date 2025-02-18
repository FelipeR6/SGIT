<?php
include('../conexion/conexion.php');
$id = $_GET["id"];

// Usamos una consulta preparada para obtener los datos del usuario
$stmt = $conexion->prepare("SELECT * FROM usuario WHERE Id_Usuario = ?");
$stmt->bind_param("i", $id);  // "i" es el tipo de dato para el ID (entero)
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    // Si no se encuentra el usuario, mostramos un mensaje de error
    echo "Usuario no encontrado.";
    exit;
}

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Modificar Usuario</title>
    <link rel="stylesheet" href="../css/crud.css">
</head>

<body>
    <!-- Contenedor Principal -->
    <div class="container py-5">
        <form class="form-modificar col-12 col-md-6 col-lg-4 mx-auto" method="POST">
            <h3 class="text-center text-secondary mb-4">Modificar Usuario</h3>
            <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">

            <?php while ($datos = $result->fetch_object()) { ?>
                <div class="mb-3">
                    <label for="Usuario" class="form-label">Usuario</label>
                    <input type="text" class="form-control" name="Usuario"
                        value="<?= htmlspecialchars($datos->Usuario) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Nombre_Usuario_1" class="form-label">Primer Nombre</label>
                    <input type="text" class="form-control" name="Nombre_Usuario_1"
                        value="<?= htmlspecialchars($datos->Nombre_Usuario_1) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Nombre_Usuario_2" class="form-label">Segundo Nombre</label>
                    <input type="text" class="form-control" name="Nombre_Usuario_2"
                        value="<?= htmlspecialchars($datos->Nombre_Usuario_2) ?>">
                </div>
                <div class="mb-3">
                    <label for="Apellidos_Usuario_1" class="form-label">Primer Apellido</label>
                    <input type="text" class="form-control" name="Apellidos_Usuario_1"
                        value="<?= htmlspecialchars($datos->Apellidos_Usuario_1) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Apellidos_Usuario_2" class="form-label">Segundo Apellido</label>
                    <input type="text" class="form-control" name="Apellidos_Usuario_2"
                        value="<?= htmlspecialchars($datos->Apellidos_Usuario_2) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Telefono_1_Usuario" class="form-label">Celular 1</label>
                    <input type="text" class="form-control" name="Telefono_1_Usuario"
                        value="<?= htmlspecialchars($datos->Telefono_1_Usuario) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Telefono_2_Usuario" class="form-label">Telefono 2</label>
                    <input type="text" class="form-control" name="Telefono_2_Usuario"
                        value="<?= htmlspecialchars($datos->Telefono_2_Usuario) ?>">
                </div>
                <div class="mb-3">
                    <label for="Correo_Usuario" class="form-label">Correo</label>
                    <input type="email" class="form-control" name="Correo_Usuario"
                        value="<?= htmlspecialchars($datos->Correo_Usuario) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Contraseña" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" name="Contraseña"
                        value="<?= htmlspecialchars($datos->Contraseña) ?>" required>
                </div>
                <div class="mb-3">
                    <label for="Id_Rol" class="form-label">Rol</label>
                    <input type="text" class="form-control" name="Id_Rol" value="<?= htmlspecialchars($datos->Id_Rol) ?>"
                        required>
                </div>
            <?php } ?>

            <!-- Botón para modificar -->
            <button type="submit" class="btn btn-primary btn-modificar w-100" name="btnmodificar"
                value="ok">Modificar</button>
            <a href="../usuario/comprobar_registro.php" class="btn btn-secondary w-100 mt-3">Regresar</a>
        </form>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>

<?php
// Verificamos si se ha enviado el formulario para modificar
if (isset($_POST['btnmodificar'])) {
    // Recogemos los datos del formulario
    $usuario = $_POST['Usuario'];
    $nombre1 = $_POST['Nombre_Usuario_1'];
    $nombre2 = $_POST['Nombre_Usuario_2'];
    $apellido1 = $_POST['Apellidos_Usuario_1'];
    $apellido2 = $_POST['Apellidos_Usuario_2'];
    $telefono1 = $_POST['Telefono_1_Usuario'];
    $telefono2 = $_POST['Telefono_2_Usuario'];
    $correo = $_POST['Correo_Usuario'];
    $contraseña = $_POST['Contraseña'];
    $rol = $_POST['Id_Rol'];

    $stmt = $conexion->prepare("UPDATE usuario SET Usuario = ?, Nombre_Usuario_1 = ?, Nombre_Usuario_2 = ?, Apellidos_Usuario_1 = ?, Apellidos_Usuario_2 = ?, Telefono_1_Usuario = ?, Telefono_2_Usuario = ?, Correo_Usuario = ?, Contraseña = ?, Id_Rol = ? WHERE Id_Usuario = ?");
    $stmt->bind_param("ssssssssssi", $usuario, $nombre1, $nombre2, $apellido1, $apellido2, $telefono1, $telefono2, $correo, $contraseña, $rol, $id);

    if ($stmt->execute()) {
        echo "<script>alert('Usuario actualizado correctamente'); window.location.href = 'comprobar_registro.php';</script>";
    } else {
        echo "<script>alert('Error al actualizar el usuario');</script>";
    }
}
?>
