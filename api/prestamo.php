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
$sql = "SELECT `prestamo_equipo`.`Id_Prestamo_Equipo`, `prestamo_equipo`.`Fecha_Prestamo_Equipo`, `prestamo_equipo`.`Fecha_entrega_prestamo`, `usuario`.`Nombre_Usuario_1`, `equipo`.`Marca_Equipo`, `ubicacion`.`Nombre_Ubicacion`, `estado_equipo`.`Estado_Entregado`
FROM `prestamo_equipo` 
	LEFT JOIN `usuario` ON `prestamo_equipo`.`Id_Usuario` = `usuario`.`Id_Usuario` 
	LEFT JOIN `equipo` ON `equipo`.`Id_Usuario` = `usuario`.`Id_Usuario` 
	LEFT JOIN `ubicacion` ON `prestamo_equipo`.`Id_Ubicacion` = `ubicacion`.`Id_Ubicacion` 
	LEFT JOIN `estado_equipo` ON `prestamo_equipo`.`Id_Estado_Equipo` = `estado_equipo`.`Id_Estado_equipo`;";

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
