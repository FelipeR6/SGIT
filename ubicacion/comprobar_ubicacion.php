<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Ubicacion</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome para íconos -->
    <script src="https://kit.fontawesome.com/0ddb2275a5.js" crossorigin="anonymous"></script>
    <!-- Estilo personalizado -->
    <link rel="stylesheet" href="../css/crud.css">
</head>

<body>
    <!-- Contenido principal -->
    <div class="container py-5">
        <h1 class="text-center">CRUD Ubicacion</h1>
        <p class="text-center text-muted">Administra La ubicacion de equipos de manera sencilla.</p>

        <!-- Tabla -->
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-info text-center">
                    <tr>
                        <th>ID</th>
                        <th>Nombre Ubicacion</th>
                        <th>Prestamo disponible</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include('../conexion/conexion.php');
                    include "controlador/eliminar_ubicacion.php";

                    $sql = $conexion->query("SELECT * FROM ubicacion");
                    while ($datos = $sql->fetch_object()) { ?>
                        <tr>
                            <td><?= htmlspecialchars($datos->Id_Ubicacion) ?></td>
                            <td><?= htmlspecialchars($datos->Nombre_Ubicacion) ?></td>
                            <td><?= htmlspecialchars($datos->Prestamo_disponible) ?></td>
                            <td class="text-center">
                            <a href="../ubicacion/modificar_ubicacion.php?id=<?= $datos->Id_Ubicacion?>" class="btn btn-warning btn-sm">
                                    <i class="fa-solid fa-user-pen"></i>
                                </a>
                                <a onclick="return eliminar()" href="../ubicacion/comprobar_ubicacion.php?id=<?= $datos->Id_Ubicacion?>" class="btn btn-danger btn-sm">
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
            <a href="/inicio" class="btn btn-secondary">Regresar</a>
            <a href="../ubicacion/ubicacion.php" class="btn btn-primary">Añadir Ubicacion</a>
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
