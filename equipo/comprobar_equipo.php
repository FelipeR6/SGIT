<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Equipo</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <link href="https://getbootstrap.com/docs/5.3/assets/css/docs.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  </head>
  <body>
    <?php
    // Conectar a la base de datos
    include('../conexion/conexion.php');
    include "controlador/eliminar_equipo.php";

    if (!$conexion) {
        die("<div class='container text-center text-danger'><h2>Error de conexión</h2><p>" . $conexion->connect_error . "</p></div>");
    }

    // Consultar los equipos
    $sql = $conexion->query("SELECT * FROM equipo");
    ?>

    <div class="container py-5">
        <h1 class="text-center">CRUD Equipo</h1>
        <p class="text-center text-muted">Administra la información de los equipos de manera sencilla.</p>

        <!-- Tabla -->
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-info text-center">
                    <tr>
                        <th>ID</th>
                        <th>Marca Equipo</th>
                        <th>Año Equipo</th>
                        <th>Id Categoria</th>
                        <th>Id Modelo</th>
                        <th>Id Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($sql->num_rows > 0) { 
                        while ($datos = $sql->fetch_object()) { ?>
                            <tr>
                                <td><?= htmlspecialchars($datos->Id_Equipos) ?></td>
                                <td><?= htmlspecialchars($datos->Marca_Equipo) ?></td>
                                <td><?= htmlspecialchars($datos->Año_Equipo) ?></td>
                                <td><?= htmlspecialchars($datos->Id_Categoria) ?></td>
                                <td><?= htmlspecialchars($datos->Id_Modelo) ?></td>
                                <td><?= htmlspecialchars($datos->Id_Usuario) ?></td>
                                <td class="text-center">
                                    <a href="../equipo/modificar_equipo.php?id=<?= $datos->Id_Equipos ?>" class="btn btn-warning btn-sm">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <a href="../equipo/comprobar_equipo.php?id=<?= $datos->Id_Equipos ?>" class="btn btn-danger btn-sm" onclick="return eliminar(event)">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                    <?php } 
                    } else { ?>
                        <tr>
                            <td colspan="7" class="text-center text-muted">No hay equipos registrados</td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>

        <!-- Botones -->
        <div class="d-flex justify-content-between">
            <a href="../Consultar.html" class="btn btn-secondary">Regresar</a>
            <a href="../equipo/equipo.php" class="btn btn-primary">Añadir Equipo</a>
        </div>
    </div>

    <!-- Confirmación de eliminación -->
    <script>
        function eliminar(event) {
            if (!confirm("¿Estás seguro que deseas eliminar?")) {
                event.preventDefault();
                return false;
            }
        }
    </script>

    <!-- Scripts de Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>

