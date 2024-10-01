<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Mantenimiento</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <style>
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: linear-gradient(to right, #6a11cb, #2575fc);
            font-family: 'Poppins', sans-serif;
        }

        .container {
            max-width: 500px;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            padding: 20px;
            transition: transform 0.3s;
        }

        .container:hover {
            transform: scale(1.02);
        }

        h1, h3 {
            text-align: center;
            font-weight: 600;
            color: #6a11cb;
        }

        .form-control {
            border-radius: 10px;
            transition: border-color 0.3s;
        }

        .form-control:focus {
            border-color: #6a11cb;
            box-shadow: 0 0 5px rgba(106, 17, 203, 0.5);
        }

        .btn-custom {
            background-color: #6a11cb;
            color: white;
            border-radius: 10px;
            transition: background-color 0.3s, transform 0.3s;
            width: 100%;
            margin-top: 10px;
        }

        .btn-custom:hover {
            background-color: #2575fc;
            transform: translateY(-2px);
        }

        .btn-group {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
        }

        .btn-group a {
            width: 48%;
        }
    </style>
</head>

<body>

    <div class="container">
        <h3>CRUD Mantenimiento</h3>
        <form method="POST">
            <?php include "controlador/registro_mantenimiento.php"; ?>
            <div class="mb-3">
                <label for="Fecha_Inicio_mantenimiento" class="form-label">Fecha Inicio Mantenimiento</label>
                <input type="date" class="form-control" name="Fecha_Inicio_mantenimiento" required>
            </div>
            <div class="mb-3">
                <label for="Fecha_fin_mantenimiento" class="form-label">Fecha Fin Mantenimiento</label>
                <input type="date" class="form-control" name="Fecha_fin_mantenimiento" required>
            </div>
            <div class="mb-3">
                <label for="Observaciones" class="form-label">Observaciones</label>
                <input type="text" class="form-control" name="Observaciones" required>
            </div>
            <div class="mb-3">
                <label for="Id_Equipos" class="form-label">ID Equipos</label>
                <input type="number" class="form-control" name="Id_Equipos" required>
            </div>
            <div class="mb-3">
                <label for="Id_Usuario" class="form-label">ID Usuario</label>
                <input type="number" class="form-control" name="Id_Usuario" required>
            </div>

            <button type="submit" class="btn btn-custom" name="btnregistrar" value="ok">Registrar</button>

            <div class="btn-group">
                <a href="/inicio1.php" class="btn btn-secondary">Regresar</a>
                <a href="./comprobar_mantenimiento.php" class="btn btn-warning">Comprobar</a>
            </div>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
