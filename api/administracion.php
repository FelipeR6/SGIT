<?php
// Permitir acceso desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conexión a la base de datos
$host = "localhost";
$username = "root";
$password = "";
$database = "sgit";
$conn = new mysqli($host, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Obtener el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

// Manejo de solicitud según método
switch ($method) {
    case 'GET': // Obtener todos los equipos
        $sql = "SELECT equipo.Id_Equipos, equipo.Marca_Equipo, equipo.Año_Equipo, 
                        categoria.Nombre_Categoria, estado_equipo.Estado_Entregado, estado_equipo.Estado_Recibido
                FROM equipo 
                LEFT JOIN categoria ON equipo.Id_Categoria = categoria.Id_Categoria
                LEFT JOIN estado_equipo ON equipo.Id_Equipos = estado_equipo.Id_Equipos";

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
        break;

    case 'POST': // Insertar un nuevo equipo
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['Marca_Equipo'], $data['Año_Equipo'], $data['Id_Categoria'])) {
            echo json_encode(["error" => "Datos incompletos"]);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO equipo (Marca_Equipo, Año_Equipo, Id_Categoria) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $data['Marca_Equipo'], $data['Año_Equipo'], $data['Id_Categoria']);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Equipo agregado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al agregar el equipo"]);
        }

        $stmt->close();
        break;

    case 'PUT': // Editar un equipo
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['Id_Equipos'], $data['Marca_Equipo'], $data['Año_Equipo'], $data['Id_Categoria'])) {
            echo json_encode(["error" => "Datos incompletos"]);
            exit;
        }

        $stmt = $conn->prepare("UPDATE equipo SET Marca_Equipo = ?, Año_Equipo = ?, Id_Categoria = ? WHERE Id_Equipos = ?");
        $stmt->bind_param("ssii", $data['Marca_Equipo'], $data['Año_Equipo'], $data['Id_Categoria'], $data['Id_Equipos']);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Equipo actualizado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al actualizar el equipo"]);
        }

        $stmt->close();
        break;

    case 'DELETE': // Eliminar un equipo
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['Id_Equipos'])) {
            echo json_encode(["error" => "ID del equipo no proporcionado"]);
            exit;
        }

        $stmt = $conn->prepare("DELETE FROM equipo WHERE Id_Equipos = ?");
        $stmt->bind_param("i", $data['Id_Equipos']);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Equipo eliminado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al eliminar el equipo"]);
        }

        $stmt->close();
        break;

    default:
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

// Cerrar conexión
$conn->close();
?>
