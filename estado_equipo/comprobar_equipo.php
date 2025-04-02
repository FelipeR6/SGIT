<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/0ddb2275a5.js" crossorigin="anonymous"></script>
</head>

<body>

    <script>
        function eliminar() {
            var respuesta = confirm("¿Estás seguro que deseas eliminar?");
            return respuesta;
        }
    </script>
    <h1 class="text-center p-2">CRUD Estado del Equipo</h1>

    <?php
    include "modelo/conexion.php";
    include "controlador/eliminar_equipo.php";
    ?>
    <div class="container-fluid row">
        <div class="col-8 p-4">
            <table class="table table-striped">
                <thead class="bg-info">
                    <tr>
                        <th scope="col">ID Estado</th>
                        <th scope="col">Estado Entregado</th>
                        <th scope="col">Estado Recibido</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include "conexion/conexion.php";
                    $sql = $conexion->query("SELECT * FROM estado_equipo");
                    while ($datos = $sql->fetch_object()) { ?>
                        <tr>
                            <td><?= $datos->Id_Estado_equipo ?></td>
                            <td><?= $datos->Estado_Entregado ?></td>
                            <td><?= $datos->Estado_Recibido ?></td>
                            <td>
                                <a href="../estado_equipo/modificar_equipo.php?id=<?= $datos->Id_Estado_equipo ?>"
                                    class="btn btn-small btn-warning"><i class="fa-solid fa-user-pen"></i></a>
                                <a onclick="return eliminar()"
                                    href="../estado_equipo\comprobar_equipo.php?id=<?= $datos->Id_Estado_equipo ?>"
                                    class="btn btn-small btn-danger"><i class="fa-solid fa-trash"></i></a>
                            </td>
                        </tr>
                    <?php }
                    ?>
                </tbody>
            </table>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>

</html>