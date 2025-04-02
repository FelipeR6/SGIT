<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Hoja de Vida del Equipo</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome para íconos -->
    <script src="https://kit.fontawesome.com/0ddb2275a5.js" crossorigin="anonymous"></script>
</head>

<body>
    <!-- Contenido principal -->
    <div class="container py-5">
        <h1 class="text-center">CRUD Hoja de Vida del Equipo</h1>
        <p class="text-center text-muted">Administra la hoja de vida de los equipos de manera sencilla.</p>

        <!-- Tabla -->
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-info text-center">
                    <tr>
                        <th>ID Hoja de Vida</th>
                        <th>ID Equipos</th>
                        <th>Estado Equipo</th>
                        <th>ID Usuario</th>
                        <th>Fecha Ingreso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include('../conexion/conexion.php');
                    include "controlador/eliminar_hv.php";

                    $sql = $conexion->query("SELECT * FROM hoja_vida_equipo");
                    while ($datos = $sql->fetch_object()) { ?>
                        <tr>
                            <td><?= htmlspecialchars($datos->Id_Hoja_vida_equipo) ?></td>
                            <td><?= htmlspecialchars($datos->Id_Equipos) ?></td>
                            <td><?= htmlspecialchars($datos->Estado_Equipo) ?></td>
                            <td><?= htmlspecialchars($datos->Id_usuario) ?></td>
                            <td><?= htmlspecialchars($datos->Fecha_ingreso) ?></td>
                            <td class="text-center">
                                <a href="../hoja_de_vida/modificar_hv.php?id=<?= $datos->Id_Hoja_vida_equipo ?>"
                                    class="btn btn-warning btn-sm">
                                    <i class="fa-solid fa-user-pen"></i>
                                </a>
                                <a onclick="return eliminar()"
                                    href="../hoja_de_vida/comprobar_hv.php?id=<?= $datos->Id_Hoja_vida_equipo ?>"
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
            <a href="../hoja_de_vida/hoja_de_vida.php" class="btn btn-primary">Añadir Hoja</a>
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