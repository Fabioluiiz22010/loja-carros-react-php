<?php
include("Carros/API_Carros.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");
header("Content-type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

// Instanciando a classe CarrosAPI com a conexão PDO
$carrosAPI = new CarrosAPI($pdo);

// GET - todos os carros
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['id'])) {
    $carros = $carrosAPI->consultarCarros();
    echo json_encode($carros);
}

// GET - apenas um carro
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $carro = $carrosAPI->consultarCarro($_GET['id']);
    echo json_encode($carro);
}

// POST - criar novo carro
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($carrosAPI->criarCarro($data['modelo'], $data['ano'], $data['cor'], $data['tipo_combustivel'], $data['placa'])) {
        echo json_encode(["message" => "Carro cadastrado com sucesso."]);
    } else {
        echo json_encode(["message" => "Falha ao cadastrar carro."]);
    }
}

// PUT - atualizar carro
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($carrosAPI->atualizarCarro($data['id'], $data['modelo'], $data['ano'], $data['cor'], $data['tipo_combustivel'], $data['placa'])) {
        echo json_encode(["message" => "Carro atualizado com sucesso."]);
    } else {
        echo json_encode(["message" => "Falha ao atualizar carro."]);
    }
}

// DELETE - excluir carro
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    if ($carrosAPI->excluirCarro($_GET['id'])) {
        echo json_encode(["message" => "Carro excluído com sucesso."]);
    } else {
        echo json_encode(["message" => "Falha ao excluir carro."]);
    }
}
?>
