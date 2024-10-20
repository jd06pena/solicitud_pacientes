CREATE TABLE solicitud_paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_solicitante VARCHAR(100),
    nombre_paciente VARCHAR(100),
    cedula_paciente VARCHAR(100),
    examen VARCHAR(100),
    telefonos VARCHAR(100),
    fecha_solicitada VARCHAR(100)
);