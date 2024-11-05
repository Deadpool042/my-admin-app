<?php
$config = include(__DIR__ . '/../config/config.php');

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], ['http://localhost:3000', $config['base_url']])) {
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
  header("Access-Control-Allow-Origin: " . $config['base_url']);
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization');
header('Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages');
header("Content-Type: application/json; charset=UTF-8");
