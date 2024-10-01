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
        function eliminar(){
            var respuesta=confirm("Estas seguro que deseas eliminar");
            return respuesta
        }
    </script>
    <h1 class="text-center p-2">CRUD Rol</h1>
    <?php
            include "rol/conexion.php";
            include "controlador/eliminar_rol.php";
            ?>
    <div class="container-fluid row">
        <form class="col-4 p-3" method="POST">
            <h3 class="text-center text-secondary">Rol</h3>
            <?php
            include "controlador/registro_Rol.php";
            ?>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Nombre Rol</label>
                <input type="text" class="form-control" name="Nombre_Rol">
            </div>
        
            

            <button type="submit" class="btn btn-primary" name="btnregistrar" value="ok">Registrar</button>
        </form>
        <div class="col-8 p-4">
            <table class="table table-striped">
                <thead class="bg-info">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre Rol</th>
                        <th scope="col"> </th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include "rol/conexion.php";
                    $sql = $conexion->query(" SELECT * FROM rol ");
                    while ($datos = $sql->fetch_object()) { ?>

                        <tr>
                            <td><?= $datos->Id_Rol ?></td>
                            <td><?= $datos->Nombre_Rol ?></td>
                            
                            <td>
                                <a href="modificar_rol.php?id=<?= $datos->Id_Rol   ?>" class="btn btn-small btn-warning"><i class="fa-solid fa-user-pen"></i></a>
                                <a onclick="return eliminar()" href="rol.php?id=<?= $datos->Id_Rol   ?>" class="btn btn-small btn-danger"><i class="fa-solid fa-trash"></i></a>
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