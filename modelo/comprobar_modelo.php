<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Modelo</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome para íconos -->
    <script src="https://kit.fontawesome.com/0ddb2275a5.js" crossorigin="anonymous"></script>
</head>

<body>

    <div class="container py-5">
        <h1 class="text-center">CRUD Modelo</h1>
        <p class="text-center text-muted">Administra la información de los modelos de manera sencilla.</p>

        <!-- Tabla -->
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-info text-center">
                    <tr>
                        <th>ID</th>
                        <th>Características Modelo</th>
                        <th>Accesorios Modelo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include('../conexion/conexion.php');
                    include "controlador/eliminar_modelo.php";

                    $sql = $conexion->query("SELECT * FROM modelo");
                    while ($datos = $sql->fetch_object()) { ?>
                        <tr>
                            <td><?= htmlspecialchars($datos->Id_Modelo) ?></td>
                            <td><?= htmlspecialchars($datos->Caracteristicas_Modelo) ?></td>
                            <td><?= htmlspecialchars($datos->Accesorios_Modelo) ?></td>
                            <td class="text-center">
                                <a href="../modelo/modificar_modelo.php?id=<?= $datos->Id_Modelo ?>"
                                    class="btn btn-warning btn-sm">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </a>
                                <a onclick="return eliminar()"
                                    href="../modelo/comprobar_modelo.php?id=<?= $datos->Id_Modelo ?>"
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
            <a href="../modelo/modelo.php" class="btn btn-primary">Añadir Modelo</a>
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