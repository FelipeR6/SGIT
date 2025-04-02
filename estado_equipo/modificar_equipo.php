<?php
include "conexion/conexion.php";
$id = $_GET["id"];
$sql = $conexion->query("SELECT * FROM estado_equipo WHERE Id_Estado_equipo = $id");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Modificar Estado del Equipo</title>
</head>
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
<body>
<form class="col-4 p-3 m-auto" method="POST">
    <h3 class="text-center text-secondary">Modificar Estado</h3>
    <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">

    <?php
    include "controlador/modificar_equipo.php";
    while ($datos = $sql->fetch_object()) { ?>
        <div class="mb-3">
            <label for="estado_entregado" class="form-label">Estado Entregado</label>
            <input type="text" class="form-control" name="Estado_Entregado" id="estado_entregado" value="<?= htmlspecialchars($datos->Estado_Entregado) ?>" required>
        </div>
        <div class="mb-3">
            <label for="estado_recibido" class="form-label">Estado Recibido</label>
            <input type="text" class="form-control" name="Estado_Recibido" id="estado_recibido" value="<?= htmlspecialchars($datos->Estado_Recibido) ?>" required>
        </div>
    <?php } ?>

    <button type="submit" class="btn btn-primary" name="btnmodificar" value="ok">Modificar</button>
</form>

</body>
</html>
