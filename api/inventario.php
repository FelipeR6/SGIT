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
        obtenerEquipos($conn);
        break;
    case "POST":
        agregarEquipo($conn);
        break;
    case "PUT":
        editarEquipo($conn);
        break;
    case "DELETE":
        eliminarEquipo($conn);
        break;
    default:
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

// Cerrar conexión
$conn->close();

// 🔹 Función para obtener equipos
function obtenerEquipos($conn) {
    $sql = "SELECT e.Id_Equipos, e.Marca_Equipo, e.Año_Equipo, c.Nombre_Categoria, m.Caracteristicas_Modelo, 
    (SELECT MAX(pe.Fecha_Prestamo_Equipo) 
    FROM prestamo_equipo pe WHERE pe.Id_Equipos = e.Id_Equipos) AS Ultimo_Prestamo 
    FROM equipo e 
    JOIN categoria c ON e.Id_Categoria = c.Id_Categoria 
    JOIN modelo m ON e.Id_Modelo = m.Id_Modelo;";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $equipos = [];
        while ($row = $result->fetch_assoc()) {
            $equipos[] = $row;
        }
        echo json_encode($equipos);
    } else {
        echo json_encode(["error" => "No se encontraron equipos"]);
    }
}

// 🔹 Función para agregar un equipo
function agregarEquipo($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["Marca_Equipo"], $data["Año_Equipo"], $data["Id_Categoria"], $data["Id_Modelo"], $data["Id_Usuario"])) {
        echo json_encode(["error" => "Datos incompletos"]);
        return;
    }

    $marca = $conn->real_escape_string($data["Marca_Equipo"]);
    $anio = $conn->real_escape_string($data["Año_Equipo"]);
    $categoria = (int) $data["Id_Categoria"];
    $modelo = (int) $data["Id_Modelo"];
    $usuario = (int) $data["Id_Usuario"]; // Nuevo parámetro

    // 🔹 Verificar si el usuario existe antes de insertar el equipo
    $sqlCheckUser = "SELECT Id_Usuario FROM usuario WHERE Id_Usuario = $usuario";
    $result = $conn->query($sqlCheckUser);
    
    if ($result->num_rows == 0) {
        echo json_encode(["error" => "El Id_Usuario proporcionado no existe"]);
        return;
    }

    // 🔹 Insertar el equipo con el Id_Usuario
    $sql = "INSERT INTO equipo (Marca_Equipo, Año_Equipo, Id_Categoria, Id_Modelo, Id_Usuario) 
            VALUES ('$marca', '$anio', $categoria, $modelo, $usuario)";

    if ($conn->query($sql)) {
        echo json_encode(["message" => "Equipo agregado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al agregar el equipo: " . $conn->error]);
    }
}


// 🔹 Función para editar un equipo
function editarEquipo($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["Id_Equipos"], $data["Marca_Equipo"], $data["Año_Equipo"], $data["Id_Categoria"], $data["Id_Modelo"])) {
        echo json_encode(["error" => "Datos incompletos"]);
        return;
    }

    $id = (int) $data["Id_Equipos"];
    $marca = $conn->real_escape_string($data["Marca_Equipo"]);
    $anio = $conn->real_escape_string($data["Año_Equipo"]);
    $categoria = (int) $data["Id_Categoria"];
    $modelo = (int) $data["Id_Modelo"];

    $sql = "UPDATE equipo SET Marca_Equipo = '$marca', Año_Equipo = '$anio', Id_Categoria = $categoria, Id_Modelo = $modelo WHERE Id_Equipos = $id";

    if ($conn->query($sql)) {
        echo json_encode(["message" => "Equipo actualizado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar el equipo: " . $conn->error]);
    }
}

// 🔹 Función para eliminar un equipo
function eliminarEquipo($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["Id_Equipos"])) {
        echo json_encode(["error" => "ID de equipo no proporcionado"]);
        return;
    }

    $id = (int) $data["Id_Equipos"];

    $sql = "DELETE FROM equipo WHERE Id_Equipos = $id";

    if ($conn->query($sql)) {
        echo json_encode(["message" => "Equipo eliminado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al eliminar el equipo: " . $conn->error]);
    }
}
?>
