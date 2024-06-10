DROP DATABASE IF EXISTS bluesky;
CREATE DATABASE bluesky;
USE bluesky;

-- Tabla Cliente
CREATE TABLE Cliente (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(100) NOT NULL
);

-- Tabla Vuelo
CREATE TABLE Vuelo (
    vuelo_id INT AUTO_INCREMENT PRIMARY KEY,
    origen VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    fecha_salida DATE NOT NULL,
    fecha_regreso DATE,
    precio DECIMAL(10, 2) NOT NULL,
    tipo_vuelo VARCHAR(50) NOT NULL
);

-- Tabla Reserva
CREATE TABLE Reserva (
    reserva_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    vuelo_id INT NOT NULL,
    fecha_reserva DATE NOT NULL,
    estado VARCHAR(50) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id) ON DELETE CASCADE,
    FOREIGN KEY (vuelo_id) REFERENCES Vuelo(vuelo_id)
);

-- Tabla Método de Pago
CREATE TABLE MetodoPago (
    metodo_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_metodo VARCHAR(50) NOT NULL
);

-- Tabla Pago
CREATE TABLE Pago (
    pago_id INT AUTO_INCREMENT PRIMARY KEY,
    reserva_id INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fecha_pago DATE NOT NULL,
    metodo_pago INT NOT NULL,
    FOREIGN KEY (reserva_id) REFERENCES Reserva(reserva_id) ON DELETE CASCADE,
    FOREIGN KEY (metodo_pago) REFERENCES MetodoPago(metodo_id)
);