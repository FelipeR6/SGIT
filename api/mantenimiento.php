<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Parámetros de conexión
$host = "localhost";
$username = "root";
$password = "";
$database = "sgit";

// Conectar a la base de datos
$conn = new mysqli($host, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Obtener método de la solicitud
$method = $_SERVER["REQUEST_METHOD"];

// Manejo de métodos HTTP
switch ($method) {
    case "GET":
        obtenerMantenimientos($conn);
        break;
    case "POST":
        agregarMantenimiento($conn);
        break;
    case "PUT":
        editarMantenimiento($conn);
        break;
    case "DELETE":
        eliminarMantenimiento($conn);
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

// Cerrar conexión
$conn->close();

// 🔹 Función para obtener mantenimientos
function obtenerMantenimientos($conn) {
    $sql = "SELECT m.Id_Mantenimiento, e.Marca_Equipo, m.Fecha_Inicio_mantenimiento, 
                   m.Fecha_fin_mantenimiento, m.Observaciones 
            FROM mantenimiento m
            LEFT JOIN equipo e ON m.Id_Equipos = e.Id_Equipos;";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $mantenimientos = [];
        while ($row = $result->fetch_assoc()) {
            $mantenimientos[] = $row;
        }
        echo json_encode($mantenimientos);
    } else {
        echo json_encode(["error" => "No se encontraron registros de mantenimiento"]);
    }
}

// 🔹 Función para agregar un mantenimiento
function agregarMantenimiento($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["Id_Equipos"], $data["Fecha_Inicio_mantenimiento"], $data["Fecha_fin_mantenimiento"], $data["Observaciones"])) {
        echo json_encode(["error" => "Datos incompletos"]);
        return;
    }

    $idEquipos = (int) $data["Id_Equipos"];
    $fechaInicio = $conn->real_escape_string($data["Fecha_Inicio_mantenimiento"]);
    $fechaFin = $conn->real_escape_string($data["Fecha_fin_mantenimiento"]);
    $observaciones = $conn->real_escape_string($data["Observaciones"]);

    // 🔹 Verificar si el equipo existe antes de insertar el mantenimiento
    $sqlCheckEquipo = "SELECT Id_Equipos FROM equipo WHERE Id_Equipos = $idEquipos";
    $result = $conn->query($sqlCheckEquipo);
    
    if ($result->num_rows == 0) {
        echo json_encode(["error" => "El Id_Equipos proporcionado no existe"]);
        return;
    }

    // 🔹 Insertar el mantenimiento
    $sql = "INSERT INTO mantenimiento (Id_Equipos, Fecha_Inicio_mantenimiento, Fecha_fin_mantenimiento, Observaciones) 
            VALUES ($idEquipos, '$fechaInicio', '$fechaFin', '$observaciones')";

    if ($conn->query($sql)) {
        echo json_encode(["message" => "Mantenimiento agregado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al agregar el mantenimiento: " . $conn->error]);
    }
}

// 🔹 Función para editar un mantenimiento
function editarMantenimiento($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["Id_Mantenimiento"], $data["Id_Equipos"], $data["Fecha_Inicio_mantenimiento"], $data["Fecha_fin_mantenimiento"], $data["Observaciones"])) {
        echo json_encode(["error" => "Datos incompletos"]);
        return;
    }

    $idMantenimiento = (int) $data["Id_Mantenimiento"];
    $idEquipos = (int) $data["Id_Equipos"];
    $fechaInicio = $conn->real_escape_string($data["Fecha_Inicio_mantenimiento"]);
    $fechaFin = $conn->real_escape_string($data["Fecha_fin_mantenimiento"]);
    $observaciones = $conn->real_escape_string($data["Observaciones"]);

    $sql = "UPDATE mantenimiento 
            SET Id_Equipos = $idEquipos, 
                Fecha_Inicio_mantenimiento = '$fechaInicio', 
                Fecha_fin_mantenimiento = '$fechaFin', 
                Observaciones = '$observaciones' 
            WHERE Id_Mantenimiento = $idMantenimiento";

    if ($conn->query($sql)) {
        echo json_encode(["message" => "Mantenimiento actualizado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar el mantenimiento: " . $conn->error]);
    }
}

// 🔹 Función para eliminar un mantenimiento
function eliminarMantenimiento($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["Id_Mantenimiento"])) {
        echo json_encode(["error" => "ID de mantenimiento no proporcionado"]);
        return;
    }

    $idMantenimiento = (int) $data["Id_Mantenimiento"];

    $sql = "DELETE FROM mantenimiento WHERE Id_Mantenimiento = $idMantenimiento";

    if ($conn->query($sql)) {
        echo json_encode(["message" => "Mantenimiento eliminado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al eliminar el mantenimiento: " . $conn->error]);
    }
}
?>
