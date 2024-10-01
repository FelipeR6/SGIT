<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Registro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/0ddb2275a5.js" crossorigin="anonymous"></script>
    <style>
        /* Estilo del cuerpo */
        body {
            background-color: #f8f9fa;
            font-family: 'Poppins', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        /* Contenedor del formulario */
        .container {
            max-width: 900px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            animation: fadeIn 0.5s ease;
        }

        /* Encabezado del formulario */
        h1 {
            margin-bottom: 20px;
            text-align: center;
            color: #6a11cb;
        }

        /* Estilo de la tabla */
        .table {
            border-collapse: collapse;
            width: 100%;
        }

        .table th,
        .table td {
            text-align: center;
            padding: 15px;
            border-bottom: 1px solid #ddd;
            transition: background-color 0.3s;
        }

        /* Estilo del encabezado de la tabla */
        .table th {
            background-color: #6a11cb;
            color: white;
        }

        /* Colores alternos en las filas */
        .table tbody tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        .table tbody tr:hover {
            background-color: #e9ecef;
        }

        /* Estilo de los botones */
        .btn-small {
            font-size: 0.8rem;
            border-radius: 10px;
            padding: 5px 10px;
            transition: all 0.3s ease;
        }

        /* Botones de acción */
        .btn-warning {
            background-color: #ffca2c;
            color: #fff;
            border: none;
        }

        .btn-warning:hover {
            background-color: #ffc107;
            transform: translateY(-2px);
        }

        .btn-danger {
            background-color: #dc3545;
            color: #fff;
            border: none;
        }

        .btn-danger:hover {
            background-color: #c82333;
            transform: translateY(-2px);
        }

        /* Botones de la parte inferior */
        .btn-secondary,
        .btn-primary {
            border-radius: 10px;
            margin-right: 10px;
        }

        .btn-primary:hover {
            background-color: #2575fc;
            transform: translateY(-2px);
        }

        /* Animación de fade-in */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
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
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel">
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
                            <a class="nav-link" href="CRUD_SGIT/mantenimiento/comprobar_mantenimiento.php">Mantenimiento</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="CRUD_SGIT/equipo/comprobar_equipo.php">Equipo</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="CRUD_SGIT/hoja_de_vida/comprobar_hv.php">Hoja de Vida</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="inventario.html">Inventario</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">Únete</a>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li><a class="dropdown-item" href="login.php">Inicio Sesión</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="CRUD_SGIT/usuario/registro.php">¿Eres Nuevo?</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <div class="container">
        <h1>Registro de Usuarios</h1>
        <?php
        include "modelo/conexion.php";
        include "controlador/eliminar_persona.php";
        ?>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Celular 1</th>
                    <th>Teléfono 2</th>
                    <th>Correo</th>
                    <th>Contraseña</th>
                    <th>ID Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = $conexion->query("SELECT * FROM usuario");
                if ($sql === false) {
                    die("Error in query: " . $conexion->error);
                }
                while ($datos = $sql->fetch_object()) { ?>
                    <tr>
                        <td><?= htmlspecialchars($datos->Id_Usuario) ?></td>
                        <td><?= htmlspecialchars($datos->Nombre_Usuario_1) ?></td>
                        <td><?= htmlspecialchars($datos->Nombre_Usuario_2) ?></td>
                        <td><?= htmlspecialchars($datos->Apellidos_Usuario_1) ?></td>
                        <td><?= htmlspecialchars($datos->Apellidos_Usuario_2) ?></td>
                        <td><?= htmlspecialchars($datos->Telefono_1_Usuario) ?></td>
                        <td><?= htmlspecialchars($datos->Telefono_2_Usuario) ?></td>
                        <td><?= htmlspecialchars($datos->Correo_Usuario) ?></td>
                        <td><?= htmlspecialchars($datos->Contraseña_Usuario) ?></td>
                        <td><?= htmlspecialchars($datos->Id_Rol) ?></td>
                        <td>
                            <a href="modificar_registro.php?id=<?= $datos->Id_Usuario ?>" class="btn btn-small btn-warning">
                                <i class="fa-solid fa-user-pen"></i>
                            </a>
                            <a onclick="return eliminar()" href="registro.php?id=<?= $datos->Id_Usuario ?>" class="btn btn-small btn-danger">
                                <i class="fa-solid fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
        <a href="http://localhost/maquetacion/inicio1
