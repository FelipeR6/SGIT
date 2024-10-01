<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Prestamo Equipo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/0ddb2275a5.js" crossorigin="anonymous"></script>
    <style>
        body {
            background-color: #f8f9fa;
        }

        h1 {
            margin-top: 20px;
            color: #343a40;
        }

        .container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .btn {
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            border-radius: 0.25rem;
        }

        .btn-action {
            padding: 5px 10px;
            margin: 0 5px;
            font-size: 0.9rem;
        }

        .table th, .table td {
            text-align: center;
        }

    </style>
</head>

<body>
    <script>
        function eliminar() {
            return confirm("¿Estás seguro que deseas eliminar?");
        }
    </script>
    
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid">
          <img src="imagenes/logo.png" width="5%" alt="Logo">
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Bienvenido</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                  <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                      <li class="nav-item">
                          <a class="nav-link active" aria-current="page" href="inicio1.php">Inicio</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="CRUD_SGIT\mantenimiento\comprobar_mantenimiento.php">Mantenimiento</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="CRUD_SGIT\equipo\comprobar_equipo.php">Equipo</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="CRUD_SGIT\hoja_de_vida\comprobar_hv.php">Hoja de Vida</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="inventario.html">Inventario</a>
                        </li>
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Únete</a>
                          <ul class="dropdown-menu dropdown-menu-dark">
                              <li><a class="dropdown-item" href="login.php">Inicio Sesión</a></li>
                              <li><hr class="dropdown-divider"></li>
                              <li><a class="dropdown-item" href="CRUD_SGIT\usuario\registro.php">¿Eres Nuevo?</a></li>
                          </ul>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </nav>

    <div class="container mt-5">
        <h1 class="text-center p-2">CRUD Prestamo Equipo</h1>
        <?php
            include "modelo/conexion.php";
            include "controlador/eliminar_prestamo.php";
        ?>
        
        <table class="table table-striped">
            <thead class="bg-info">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Fecha Prestamo Equipo</th>
                    <th scope="col">Fecha entrega prestamo</th>
                    <th scope="col">Id Usuario</th>
                    <th scope="col">Id Equipos</th>
                    <th scope="col">Id Ubicacion</th>
                    <th scope="col">Id Estado Equipo</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
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
                        <td>
                            <a href="modificar_prestamo.php?id=<?= $datos->Id_Prestamo_Equipo ?>" class="btn btn-small btn-warning">
                                <i class="fa-solid fa-user-pen"></i>
                            </a>
                            <a onclick="return eliminar()" href="prestamo.php?id=<?= $datos->Id_Prestamo_Equipo ?>" class="btn btn-small btn-danger">
                                <i class="fa-solid fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
        <a href="http://localhost/maquetacion/inicio1.php" class="btn btn-secondary">Regresar</a>
        <a href="http://localhost/maquetacion/CRUD_SGIT/mantenimiento/registrar_mantenimiento.php" class="btn btn-primary">Añadir Mantenimiento</a>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>

</html>
