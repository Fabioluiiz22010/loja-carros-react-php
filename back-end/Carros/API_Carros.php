<?php
// Incluindo arquivo de configuração do banco de dados
require 'Db/config.php';

// Classe para manipulação dos carros
class CarrosAPI {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function criarCarro($modelo, $ano, $cor, $tipo_combustivel, $placa) {
        $sql = "INSERT INTO carros (modelo, ano, cor, tipo_combustivel, placa) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$modelo, $ano, $cor, $tipo_combustivel, $placa]);
    }

    public function consultarCarros() {
        $stmt = $this->pdo->query("SELECT * FROM carros");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function consultarCarro($id) {
        $sql = "SELECT * FROM carros WHERE id=?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function atualizarCarro($id, $modelo, $ano, $cor, $tipo_combustivel, $placa) {
        $sql = "UPDATE carros SET modelo=?, ano=?, cor=?, tipo_combustivel=?, placa=? WHERE id=?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$modelo, $ano, $cor, $tipo_combustivel, $placa, $id]);
    }

    public function excluirCarro($id) {
        $stmt = $this->pdo->prepare("DELETE FROM carros WHERE id=?");
        return $stmt->execute([$id]);
    }
}
?>
