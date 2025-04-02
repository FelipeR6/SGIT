<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Mantenimiento</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome para íconos -->
    <script src="https://kit.fontawesome.com/0ddb2275a5.js" crossorigin="anonymous"></script>
</head>

<body>
    <!-- Contenido principal -->
    <div class="container py-5">
        <h1 class="text-center">CRUD Mantenimiento</h1>
        <p class="text-center text-muted">Administra el mantenimiento de equipos de manera sencilla.</p>

        <!-- Tabla -->
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-info text-center">
                    <tr>
                        <th>ID</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Observaciones</th>
                        <th>ID Equipos</th>
                        <th>ID Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include('../conexion/conexion.php');
                    include "controlador/eliminar_mantenimiento.php";

                    $sql = $conexion->query("SELECT * FROM mantenimiento");
                    while ($datos = $sql->fetch_object()) { ?>
                        <tr>
                            <td><?= htmlspecialchars($datos->Id_Mantenimiento) ?></td>
                            <td><?= htmlspecialchars($datos->Fecha_Inicio_mantenimiento) ?></td>
                            <td><?= htmlspecialchars($datos->Fecha_fin_mantenimiento) ?></td>
                            <td><?= htmlspecialchars($datos->Observaciones) ?></td>
                            <td><?= htmlspecialchars($datos->Id_Equipos) ?></td>
                            <td><?= htmlspecialchars($datos->Id_Usuario) ?></td>
                            <td class="text-center">
                                <a href="../mantenimiento/modificar_matenimiento.php?id=<?= $datos->Id_Mantenimiento ?>"
                                    class="btn btn-warning btn-sm">
                                    <i class="fa-solid fa-user-pen"></i>
                                </a>
                                <a onclick="return eliminar()"
                                    href="../mantenimiento/comprobar_mantenimiento.php?id=<?= $datos->Id_Mantenimiento ?>"
                                    class="btn btn-danger btn-sm">
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
            <a href="../mantenimiento/mantenimiento.php" class="btn btn-primary">Añadir Mantenimiento</a>
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