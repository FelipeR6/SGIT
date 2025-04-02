<?php
// Database connection settings
$host = "localhost";
$username = "root";
$password = "";
$database = "sgit";

// Set headers for JSON response
header('Content-Type: application/json');

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

// Validate required fields
$required_fields = ['name', 'email', 'department', 'equipment_type', 'start_date', 'end_date', 'reason'];
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        echo json_encode(["success" => false, "message" => "Todos los campos son requeridos"]);
        exit;
    }
}

// Sanitize input data
$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$department = filter_var($_POST['department'], FILTER_SANITIZE_STRING);
$equipment_type = filter_var($_POST['equipment_type'], FILTER_SANITIZE_STRING);
$start_date = filter_var($_POST['start_date'], FILTER_SANITIZE_STRING);
$end_date = filter_var($_POST['end_date'], FILTER_SANITIZE_STRING);
$reason = filter_var($_POST['reason'], FILTER_SANITIZE_STRING);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Email inválido"]);
    exit;
}

// Validate dates
$start_date_obj = new DateTime($start_date);
$end_date_obj = new DateTime($end_date);

if ($end_date_obj <= $start_date_obj) {
    echo json_encode(["success" => false, "message" => "La fecha de devolución debe ser posterior a la fecha de inicio"]);
    exit;
}

try {
    $conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->prepare("INSERT INTO equipment_loans (name, email, department, equipment_type, start_date, end_date, reason, status, created_at) 
                           VALUES (:name, :email, :department, :equipment_type, :start_date, :end_date, :reason, 'pending', NOW())");
    
    // Bind parameters
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':department', $department);
    $stmt->bindParam(':equipment_type', $equipment_type);
    $stmt->bindParam(':start_date', $start_date);
    $stmt->bindParam(':end_date', $end_date);
    $stmt->bindParam(':reason', $reason);
    
    // Execute the statement
    $stmt->execute();
    
    // Get the ID of the inserted record
    $loan_id = $conn->lastInsertId();
    
    // Send success response
    echo json_encode([
        "success" => true, 
        "message" => "Solicitud enviada correctamente", 
        "loan_id" => $loan_id
    ]);
    
} catch(PDOException $e) {
    echo json_encode([
        "success" => false, 
        "message" => "Error de base de datos: " . $e->getMessage()
    ]);
}
?>