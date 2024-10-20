<?php
// Conectar a la base de datos
$servername = "localhost";
$username = "root"; // Usuario por defecto en Laragon
$password = ""; // Contraseña vacía por defecto en Laragon
$dbname = "solicitud_paciente"; // Cambia esto por el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario
$nombre_solicitante = $_POST['nombre_solicitante'];
$nombre_paciente = $_POST['nombre_paciente'];
$cedula_paciente = $_POST['cedula_paciente'];
$examen = $_POST['examen'];
$telefonos = $_POST['telefonos'];
$fecha_solicitada = $_POST['fecha_solicitada'];


// Insertar los datos en la tabla
$sql = "INSERT INTO solicitud_paciente (nombre_solicitante, nombre_paciente, cedula_paciente, examen,  telefonos, fecha_solicitada) VALUES ('$nombre_solicitante', '$nombre_paciente', '$cedula_paciente', '$examen', '$telefonos', '$fecha_solicitada')";

if ($conn->query($sql) === TRUE) {
    echo "Datos insertados correctamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
