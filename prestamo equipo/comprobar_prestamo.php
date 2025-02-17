<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Prestamo Equipo</title>
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
        <h1 class="text-center">CRUD Prestamo Equipo</h1>
        <p class="text-center text-muted">Administra los préstamos de equipos de manera sencilla.</p>

        <!-- Tabla -->
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-info text-center">
                    <tr>
                        <th>ID</th>
                        <th>Fecha Prestamo</th>
                        <th>Fecha Entrega</th>
                        <th>Id Usuario</th>
                        <th>Id Equipos</th>
                        <th>Id Ubicacion</th>
                        <th>Id Estado Equipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include('../conexion/conexion.php');
                    include "controlador/eliminar_prestamo.php";

                    $sql = $conexion->query("SELECT * FROM prestamo_equipo");
                    while ($datos = $sql->fetch_object()) { ?>
                        <tr>
                            <td><?= htmlspecialchars($datos->Id_Prestamo_Equipo) ?></td>
                            <td><?= htmlspecialchars($datos->Fecha_Prestamo_Equipo) ?></td>
                            <td><?= htmlspecialchars($datos->Fecha_entrega_prestamo) ?></td>
                            <td><?= htmlspecialchars($datos->Id_Usuario) ?></td>
                            <td><?= htmlspecialchars($datos->Id_Equipos) ?></td>
                            <td><?= htmlspecialchars($datos->Id_Ubicacion) ?></td>
                            <td><?= htmlspecialchars($datos->Id_Estado_Equipo) ?></td>
                            <td class="text-center">
                                <a href="../prestamo equipo/modificar_prestamo.php?id=<?= $datos->Id_Prestamo_Equipo ?>" class="btn btn-warning btn-sm">
                                    <i class="fa-solid fa-user-pen"></i>
                                </a>
                                <a onclick="return eliminar()" href="../prestamo equipo/comprobar_prestamo.php?id=<?= $datos->Id_Prestamo_Equipo ?>" class="btn btn-danger btn-sm">
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
        <a href="../inicio1.html" class="btn btn-secondary">Regresar</a>
            <a href="../prestamo equipo/prestamo.php" class="btn btn-primary">Añadir Prestamo</a>
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
