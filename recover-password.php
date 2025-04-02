<?php
require_once 'auth_functions.php';

$error = '';
$success = '';

// Procesar formulario de recuperación
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['recover'])) {
    $correo = $_POST['email'];
    
    $result = recoverPassword($correo);
    
    if ($result) {
        // En un sistema real, aquí enviarías un correo con un enlace para restablecer
        // Para este ejemplo, mostramos la contraseña directamente
        $success = "Tu contraseña es: " . $result;
    } else {
        $error = "No se encontró ninguna cuenta con ese correo electrónico";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar Contraseña - CTJFR</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div class="row justify-content-center align-items-center min-vh-100">
            <div class="col-md-8">
                <div class="card login-card">
                    <div class="row g-0">
                        <div class="col-md-5 d-none d-md-block">
                            <div class="card-side-image"></div>
                        </div>
                        <div class="col-md-7">
                            <div class="card-body p-4">
                                <div class="text-center mb-4">
                                    <img src="imagenes/CTJFR.png" alt="Logo" class="logo-img">
                                    <h2 class="mt-3">Recuperar Contraseña</h2>
                                </div>
                                
                                <?php if ($error): ?>
                                <div class="alert alert-danger"><?php echo $error; ?></div>
                                <?php endif; ?>
                                
                                <?php if ($success): ?>
                                <div class="alert alert-success"><?php echo $success; ?></div>
                                <?php endif; ?>
                                
                                <p class="text-center mb-4">Ingresa tu correo electrónico y te enviaremos instrucciones para recuperar tu contraseña.</p>
                                
                                <form method="post" action="">
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Correo Electrónico</label>
                                        <input type="email" class="form-control" id="email" name="email" required>
                                    </div>
                                    
                                    <button type="submit" name="recover" class="btn btn-primary w-100">Recuperar Contraseña</button>
                                    
                                    <div class="mt-3 text-center">
                                        <p>¿Recordaste tu contraseña? <a href="login.php">Iniciar Sesión</a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>