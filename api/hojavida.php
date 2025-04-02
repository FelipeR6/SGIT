<?php
// Permite el acceso desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Parámetros de conexión
$host = "localhost";
$username = "root";
$password = "";
$database = "sgit";

// Conexión a la base de datos
$conn = new mysqli($host, $username, $password, $database);
mysqli_set_charset($conn, "utf8");

// Verifica la conexión
if ($conn->connect_error) {
    echo json_encode(["error" => "Conexión fallida: " . $conn->connect_error]);
    exit;
}

// Consulta SQL para obtener la lista de préstamos
$sql = "SELECT 
    `hoja_vida_equipo`.`Id_Hoja_vida_equipo`, 
    `equipo`.`Marca_Equipo`, 
    `estado_equipo`.`Estado_Entregado`, 
    `estado_equipo`.`Estado_Recibido`, 
    `usuario`.`Nombre_Usuario_1`, 
    `usuario`.`Apellidos_Usuario_1`, 
    `hoja_vida_equipo`.`Fecha_ingreso`
FROM `hoja_vida_equipo`
LEFT JOIN `equipo` ON `hoja_vida_equipo`.`Id_Equipos` = `equipo`.`Id_Equipos`
LEFT JOIN `estado_equipo` ON `equipo`.`Id_Equipos` = `estado_equipo`.`Id_Equipos`
LEFT JOIN `usuario` ON `equipo`.`Id_Usuario` = `usuario`.`Id_Usuario`;
";

// Ejecuta la consulta
$result = $conn->query($sql);

// Verifica si la consulta devuelve resultados
if ($result) {
    if ($result->num_rows > 0) {
        $prestamos = [];
        while ($row = $result->fetch_assoc()) {
            $prestamos[] = $row;
        }
        echo json_encode($prestamos);
    } else {
        echo json_encode(["message" => "No se encontraron préstamos"]);
    }
} else {
    echo json_encode(["error" => "Error en la consulta: " . $conn->error]);
}

// Cierra la conexión
$conn->close();
?>
