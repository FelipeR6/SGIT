<?php
// Permite el acceso desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Establece los parámetros de conexión
$host = "localhost";
$username = "root";
$password = "";
$database = "sgit";

// Conexión a la base de datos
$conn = new mysqli($host, $username, $password, $database);

// Verifica si hubo un error de conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Consulta SQL para obtener los equipos y sus datos
$sql = "SELECT `equipo`.`Marca_Equipo`, `equipo`.`Año_Equipo`, `mantenimiento`.`Fecha_Inicio_mantenimiento`, `mantenimiento`.`Fecha_fin_mantenimiento`, `mantenimiento`.`Observaciones`, `estado_equipo`.`Estado_Entregado`, `estado_equipo`.`Estado_Recibido`
FROM `equipo` 
	LEFT JOIN `mantenimiento` ON `mantenimiento`.`Id_Equipos` = `equipo`.`Id_Equipos`
	, `estado_equipo`;";

// Ejecuta la consulta SQL
$result = $conn->query($sql);

// Verifica si la consulta devuelve resultados
if ($result->num_rows > 0) {
    // Almacena los resultados en un array
    $consulta = [];
    while ($row = $result->fetch_assoc()) {
        $consulta[] = $row;
    }
    // Devuelve los datos en formato JSON
    echo json_encode($consulta);
} else {
    // Si no hay resultados, devuelve un mensaje de error
    echo json_encode(["error" => "No se encontraron equipos"]);
}

// Cierra la conexión a la base de datos
$conn->close();
?>
