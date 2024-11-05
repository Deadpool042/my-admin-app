<?php
ob_start(); // Active la mise en tampon de sortie


include_once(__DIR__ . '/../includes/helpers.php');
include_once(__DIR__ . '/../includes/headers.php');
$method = $_SERVER['REQUEST_METHOD'];
$endpoint = 'products';

if ($method === 'GET') {
  $params = [];

  if (isset($_GET['id'])) {
    $productId = $_GET['id'];
    $endpoint .= '/' . $productId;
  } else {
    // Gestion des paramètres de pagination
    if (isset($_GET['page'])) {
      $params['page'] = intval($_GET['page']);
    }
    if (isset($_GET['per_page'])) {
      $params['per_page'] = intval($_GET['per_page']);
    }
  }

  $responseData = createAuthenticatedRequest($endpoint, 'GET', [], $params);

  // Envoyer les en-têtes de pagination si disponibles
  if (isset($responseData['headers']['x-wp-total'])) {
    header('X-WP-Total: ' . $responseData['headers']['x-wp-total']);
  }
  if (isset($responseData['headers']['x-wp-totalpages'])) {
    header('X-WP-TotalPages: ' . $responseData['headers']['x-wp-totalpages']);
  }

  // Envoyer la réponse JSON uniquement si 'body' est défini
  header('Content-Type: application/json');
  echo isset($responseData['body']) ? json_encode($responseData['body']) : json_encode(['error' => 'Empty body in response']);
  custom_log("produits: ", $responseData);

  exit;
}

if ($method === 'PUT' && isset($_GET['id'])) {
  $productId = $_GET['id'];
  $endpoint .= '/' . $productId;

  // Récupère les données JSON envoyées dans la requête PUT
  $inputData = file_get_contents('php://input');
  $data = json_decode($inputData, true); // Décoder en tableau associatif

  if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
  }

  $response = createAuthenticatedRequest($endpoint, 'PUT', $data);

  // Envoyer la réponse JSON uniquement si 'body' est défini
  header('Content-Type: application/json');
  echo isset($response['body']) ? json_encode($response['body']) : json_encode(['error' => 'Empty body in response']);
  custom_log($response);

  exit;
}

// Code pour les méthodes non supportées
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
exit;

ob_end_flush();
