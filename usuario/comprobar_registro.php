<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.7">
    <title>CRUD Usuarios</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome para íconos -->
    <script src="https://kit.fontawesome.com/0ddb2275a5.js" crossorigin="anonymous"></script>
</head>

<body>
    <!-- Contenido principal -->
    <div class="container py-4">
        <h1 class="text-center fs-3">CRUD Usuarios</h1>
        <p class="text-center text-muted fs-6">Administra los usuarios registrados de manera sencilla.</p>

        <!-- Tabla -->
        <div class="table-responsive">
            <table class="table table-bordered table-hover table-sm">
                <thead class="table-info text-center">
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Primer Telefono</th>
                        <th>Segundo Teléfono</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include('../conexion/conexion.php');
                    include "controlador/eliminar_persona.php";

                    $sql = $conexion->query("SELECT * FROM usuario");
                    while ($datos = $sql->fetch_object()) { ?>
                        <tr>
                            <td><?= htmlspecialchars($datos->Id_Usuario) ?></td>
                            <td><?= htmlspecialchars($datos->Usuario) ?></td>
                            <td><?= htmlspecialchars($datos->Nombre_Usuario_1) ?> <?= htmlspecialchars($datos->Nombre_Usuario_2) ?></td>
                            <td><?= htmlspecialchars($datos->Apellidos_Usuario_1) ?> <?= htmlspecialchars($datos->Apellidos_Usuario_2) ?></td>
                            <td><?= htmlspecialchars($datos->Telefono_1_Usuario) ?></td>
                            <td><?= htmlspecialchars($datos->Telefono_2_Usuario) ?></td>
                            <td><?= htmlspecialchars($datos->Correo_Usuario) ?></td>
                            <td><?= htmlspecialchars($datos->Contraseña) ?></td>
                            <td><?= htmlspecialchars($datos->Id_Rol) ?></td>
                            <td class="text-center">
                                <a href="../usuario/modificar_registro.php?id=<?= $datos->Id_Usuario ?>" class="btn btn-warning btn-sm">
                                    <i class="fa-solid fa-user-pen"></i>
                                </a>
                                <a onclick="return eliminar()" href="../usuario/comprobar_registro.php?id=<?= $datos->Id_Usuario ?>" class="btn btn-danger btn-sm">
                                    <i class="fa-solid fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>

        <!-- Botones -->
        <div class="d-flex justify-content-between">
        <a href="../Consultar.html" class="btn btn-secondary">Regresar</a>
            <a href="../usuario/registro.php" class="btn btn-primary">Añadir Usuario</a>
        </div>
    </div>

    <!-- Confirmación de eliminación -->
    <script>
        function eliminar() {
            return confirm("¿Estás seguro que deseas eliminar?");
        }
    </script>

    <!-- Scripts de Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
