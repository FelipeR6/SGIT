<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Préstamo Equipo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(to right, #6a11cb, #2575fc);
            font-family: 'Poppins', sans-serif;
        }

        .container {
            max-width: 600px;
            background-color: #fff;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s;
        }

        .container:hover {
            transform: scale(1.02);
        }

        h1, h3 {
            text-align: center;
            color: #203a43;
            font-weight: 600;
        }

        .form-control {
            border-radius: 10px;
            transition: border-color 0.3s;
        }

        .form-control:focus {
            border-color: #203a43;
            box-shadow: 0 0 5px rgba(32, 58, 67, 0.5);
        }

        .btn-primary {
            background-color: #203a43;
            color: white;
            border-radius: 10px;
            transition: background-color 0.3s, transform 0.3s;
            width: 100%;
            margin-top: 10px;
        }

        .btn-primary:hover {
            background-color: #0f2027;
            transform: translateY(-2px);
        }

        .btn-group .btn {
            width: 100%;
            margin-top: 10px;
            border-radius: 10px;
        }

        .btn-warning {
            background-color: #f39c12;
            transition: background-color 0.3s, transform 0.3s;
        }

        .btn-warning:hover {
            background-color: #e67e22;
            transform: translateY(-2px);
        }
    </style>
</head>

<body>
    <?php
        include "modelo/conexion.php";
    ?>
    <div class="container">
        <form method="POST">
            <h3 class="text-secondary">Registrar Préstamo</h3>
            <?php include "controlador/registro_prestamo.php"; ?>
            <div class="mb-3">
                <label for="Fecha_Prestamo_Equipo" class="form-label">Fecha Préstamo Equipo</label>
                <input type="date" class="form-control" name="Fecha_Prestamo_Equipo" required>
            </div>
            <div class="mb-3">
                <label for="Fecha_entrega_prestamo" class="form-label">Fecha Entrega Préstamo</label>
                <input type="date" class="form-control" name="Fecha_entrega_prestamo" required>
            </div>
            <div class="mb-3">
                <label for="Id_Usuario" class="form-label">ID Usuario</label>
                <input type="text" class="form-control" name="Id_Usuario" required>
            </div>
            <div class="mb-3">
                <label for="Id_Equipos" class="form-label">ID Equipos</label>
                <input type="text" class="form-control" name="Id_Equipos" required>
            </div>
            <div class="mb-3">
                <label for="Id_Ubicacion" class="form-label">ID Ubicación</label>
                <input type="text" class="form-control" name="Id_Ubicacion" required>
            </div>
            <div class="mb-3">
                <label for="Id_Estado_Equipo" class="form-label">ID Estado Equipo</label>
                <input type="text" class="form-control" name="Id_Estado_Equipo" required>
            </div>
            <button type="submit" class="btn btn-primary" name="btnregistrar" value="ok">Registrar</button>
            <div class="btn-group w-100">
                <a href="http://localhost/maquetacion/inicio1.php" class="btn btn-secondary">Regresar</a>
                <a href="http://localhost/maquetacion/CRUD_SGIT/prestamo%20equipo/comprobar_prestamo.php" class="btn btn-warning">Comprobar</a>
            </div>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
