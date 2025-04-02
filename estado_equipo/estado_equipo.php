<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD Estado del Equipo</title>
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
    </style>
</head>

<body>
    <div class="container">
        <h3>CRUD Estado del Equipo</h3>
        <form method="POST">
            <!-- Simulando la inclusión del PHP -->
            <?php include "controlador/registro_equipo.php"; ?>
            <div class="mb-3">
                <label for="estado_entregado" class="form-label">Estado Entregado</label>
                <input type="text" class="form-control" name="Estado_Entregado" id="estado_entregado" required>
            </div>
            <div class="mb-3">
                <label for="estado_recibido" class="form-label">Estado Recibido</label>
                <input type="text" class="form-control" name="Estado_Recibido" id="estado_recibido" required>
            </div>
            <button type="submit" class="btn btn-custom" name="btnregistrar" value="ok">Registrar</button>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
