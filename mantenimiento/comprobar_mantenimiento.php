<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Mantenimiento</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/0ddb2275a5.js" crossorigin="anonymous"></script>
    <style>
        body {
            background: rgb(0, 94, 83);
            background: radial-gradient(circle, rgba(0, 94, 83, 1) 0%, rgba(0, 128, 130, 1) 51%, rgba(0, 174, 169, 1) 100%);
            margin: 0; 
        }

        h1 {
            margin-top: 20px;
        }

        .navbar {
            padding: 15px; 
            height: 80px;
        }

        .container {
            max-width: 800px; 
            margin: 100px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .btn {
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

        .bg-info {
            background-color: rgba(0, 128, 130, 0.8) !important; 
        }

        .text-muted {
            color: #d3d3d3; 
        }
    </style>
</head>

<body>
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
                          <a class="nav-link" href="mantenimiento/comprobar_mantenimiento.php">Mantenimiento</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="equipo/comprobar_equipo.php">Equipo</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="hoja_de_vida/comprobar_hv.php">Hoja de Vida</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="inventario.html">Inventario</a>
                      </li>
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Únete</a>
                          <ul class="dropdown-menu dropdown-menu-dark">
                              <li><a class="dropdown-item" href="login.php">Inicio Sesión</a></li>
                              <li><hr class="dropdown-divider"></li>
                              <li><a class="dropdown-item" href="usuario/registro.php">¿Eres Nuevo?</a></li>
                          </ul>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </nav>

    <script>
        function eliminar() {
            return confirm("¿Estás seguro que deseas eliminar?");
        }
    </script>

    <?php
        include "modelo/conexion.php";
        include "controlador/eliminar_mantenimiento.php";
    ?>

    <div class="container">
        <h1 class="text-center">CRUD Mantenimiento</h1>
        <p class="text-center text-muted">Administra el mantenimiento de equipos de manera sencilla.</p>

        <table class="table table-striped">
            <thead class="bg-info">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Fecha Inicio</th>
                    <th scope="col">Fecha Fin</th>
                    <th scope="col">Observaciones</th>
                    <th scope="col">ID Equipos</th>
                    <th scope="col">ID Usuario</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
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
                            <a href="mantenimiento/modificar_mantenimiento.php?id=<?= $datos->Id_Mantenimiento ?>" class="btn btn-warning btn-action">
                                <i class="fa-solid fa-user-pen"></i>
                            </a>
                            <a onclick="return eliminar()" href="mantenimiento/mantenimiento.php?id=<?= $datos->Id_Mantenimiento ?>" class="btn btn-danger btn-action">
                                <i class="fa-solid fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>

        <div class="d-flex justify-content-between">
            <a href="./PRUEBA_SGITv2/inicio1.php" class="btn btn-secondary" style="flex: 0 0 auto;">Regresar</a>
            <a href="./mantenimiento.php" class="btn btn-primary" style="flex: 0 0 auto;">Añadir Mantenimiento</a>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
