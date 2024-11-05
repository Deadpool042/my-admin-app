<?php
include(__DIR__ . '/logs.php');

function createAuthenticatedRequest($endpoint, $method = 'GET', $data = null, $params = [])
{
  $config = include(__DIR__ . '/../config/config.php');
  $url = $config['base_url'] . '/wp-json/wc/v3/' . $endpoint;


  if (!empty($params)) {
    $url .= '?' . http_build_query($params);
  }

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_USERPWD, "{$config['consumer_key']}:{$config['consumer_secret']}");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
  curl_setopt($ch, CURLOPT_HEADER, true);

  if ($data) {
    $jsonData = json_encode($data);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Content-Length: ' . strlen($jsonData)]);
  }

  $response = curl_exec($ch);
  $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
  $header = substr($response, 0, $headerSize);
  $body = substr($response, $headerSize);

  $curlError = curl_error($ch); // Capture des erreurs curl
  curl_close($ch);

  if ($curlError) {
    custom_log("Erreur cURL : " . $curlError);
    return [
      'headers' => [],
      'body' => ['error' => 'Erreur de communication avec l\'API WooCommerce']
    ];
  }

  // Extraire les entêtes de la réponse
  $responseHeaders = [];
  foreach (explode("\r\n", $header) as $line) {
    if (strpos($line, ':') !== false) {
      list($key, $value) = explode(':', $line, 2);
      $responseHeaders[strtolower(trim($key))] = trim($value);
    }
  }

  // Retourne uniquement le JSON décodé sans aucune sortie de débogage
  return [
    'headers' => $responseHeaders,
    'body' => json_decode($body, true),
  ];
}
