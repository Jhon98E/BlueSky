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

INSERT INTO Vuelo (origen, destino, fecha_salida, fecha_regreso, precio, tipo_vuelo) VALUES
('Bogotá', 'Medellín', '2024-07-01', '2024-07-07', 150.00, 'Ida y Vuelta'),
('Cali', 'Cartagena', '2024-07-02', NULL, 100.00, 'Solo Ida'),
('Medellín', 'Barranquilla', '2024-07-03', '2024-07-09', 180.00, 'Ida y Vuelta'),
('Bogotá', 'Santa Marta', '2024-07-04', NULL, 85.00, 'Solo Ida'),
('Cartagena', 'Cali', '2024-07-05', '2024-07-11', 220.00, 'Ida y Vuelta'),
('Barranquilla', 'Bogotá', '2024-07-06', NULL, 80.00, 'Solo Ida'),
('Santa Marta', 'Medellín', '2024-07-07', '2024-07-13', 190.00, 'Ida y Vuelta'),
('Cali', 'Bogotá', '2024-07-08', NULL, 70.00, 'Solo Ida'),
('Bogotá', 'Cartagena', '2024-07-09', '2024-07-15', 230.00, 'Ida y Vuelta'),
('Medellín', 'Cali', '2024-07-10', NULL, 105.00, 'Solo Ida'),
('Cartagena', 'Bogotá', '2024-07-11', '2024-07-17', 160.00, 'Ida y Vuelta'),
('Bogotá', 'Barranquilla', '2024-07-12', NULL, 95.00, 'Solo Ida'),
('Cali', 'Santa Marta', '2024-07-13', '2024-07-19', 200.00, 'Ida y Vuelta'),
('Medellín', 'Bogotá', '2024-07-14', NULL, 75.00, 'Solo Ida'),
('Santa Marta', 'Cartagena', '2024-07-15', '2024-07-21', 170.00, 'Ida y Vuelta'),
('Bogotá', 'Cali', '2024-07-16', NULL, 110.00, 'Solo Ida'),
('Cartagena', 'Medellín', '2024-07-17', '2024-07-23', 210.00, 'Ida y Vuelta'),
('Barranquilla', 'Cali', '2024-07-18', NULL, 90.00, 'Solo Ida'),
('Cali', 'Medellín', '2024-07-19', '2024-07-25', 140.00, 'Ida y Vuelta'),
('Santa Marta', 'Bogotá', '2024-07-20', NULL, 115.00, 'Solo Ida');