<?php
include_once(__DIR__ . '/../includes/helpers.php');

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = 'users';

if ($method === 'GET') {
  // Créez la requête authentifiée et récupérez la réponse avec les en-têtes et le corps
  $response = createAuthenticatedRequest($endpoint);

  // Si la réponse est un tableau, encodez-la en JSON
  if (is_array($response)) {
    // Définir l'en-tête Content-Type pour JSON
    header('Content-Type: application/json');
    echo json_encode($response);
  } else {
    // Si createAuthenticatedRequest retourne déjà une chaîne JSON, l'afficher directement
    header('Content-Type: application/json');
    echo $response;
  }

  exit;
}

// En cas de méthode non autorisée
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
exit;