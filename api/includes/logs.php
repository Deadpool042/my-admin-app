<?php
function custom_log($message)
{
  $file = '/home/rjgj6580/laurent.c2sportsprod.com/admin/api/logs/custom_logs.log';
  $timestamp = date("Y-m-d H:i:s");

  // Vérifiez si le message est un tableau ou un objet et le formater
  if (is_array($message) || is_object($message)) {
    $message = print_r($message, true); // Convertit le tableau en chaîne lisible
  }

  $formattedMessage = "[{$timestamp}] {$message}\n";
  file_put_contents($file, $formattedMessage, FILE_APPEND);
}
