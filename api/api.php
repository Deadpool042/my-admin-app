// api/api.php
<?php
ob_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once(__DIR__ . '/includes/headers.php');
include_once(__DIR__ . '/config/config.php');
include_once(__DIR__ . '/includes/logs.php');

$endpoint = $_GET['endpoint'] ?? '';
custom_log("Endpoint: $endpoint");
switch ($endpoint) {
  case 'products':
    include(__DIR__ . '/routes/products.php');
    break;
  case 'orders':
    include(__DIR__ . '/routes/orders.php');
    break;
  default:
    http_response_code(404);
    echo json_encode(['message' => 'Endpoint not found']);
    break;
}

ob_end_flush();
