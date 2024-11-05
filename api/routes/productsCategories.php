<?php
ob_start(); // Démarre la mise en tampon de sortie

include_once(__DIR__ . '/../includes/helpers.php');
include_once(__DIR__ . '/../includes/headers.php');

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = 'products/categories';

if ($method === 'GET') {
  $params = [
    'per_page' => 100, // Récupérer toutes les catégories en une seule fois
  ];

  // Récupération de toutes les catégories
  $responseData = createAuthenticatedRequest($endpoint, 'GET', [], $params);

  // Vérification de la réponse
  if (!$responseData || !isset($responseData['body'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to retrieve categories or empty response body']);
    exit;
  }

  // Nettoie le tampon pour éviter le contenu parasite
  ob_clean();

  // Envoyer les en-têtes de pagination si disponibles
  if (isset($responseData['headers']['x-wp-total'])) {
    header('X-WP-Total: ' . $responseData['headers']['x-wp-total']);
  }
  if (isset($responseData['headers']['x-wp-totalpages'])) {
    header('X-WP-TotalPages: ' . $responseData['headers']['x-wp-totalpages']);
  }

  // Envoyer la réponse JSON
  header('Content-Type: application/json');
  echo json_encode($responseData['body']);

  custom_log("Catégories", $responseData); // Journaliser la réponse pour déboguer
  exit;
}

// Code pour les méthodes non supportées
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
exit;

ob_end_flush(); // Envoie le contenu du tampon de sortie