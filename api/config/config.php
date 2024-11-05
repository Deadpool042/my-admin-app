<?php
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

return [
  'consumer_key' => $_ENV['WC_CONSUMER_KEY'],
  'consumer_secret' => $_ENV['WC_CONSUMER_SECRET'],
  'base_url' => $_ENV['BASE_URL']
];
