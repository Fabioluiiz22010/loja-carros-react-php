CREATE TABLE carros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    cor VARCHAR(50) NOT NULL,
    tipo_combustivel VARCHAR(50) NOT NULL,
    placa VARCHAR(20) NOT NULL UNIQUE
);
