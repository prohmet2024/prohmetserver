<?php
$accounts = [];
$file = fopen('users.txt', 'r');
while ($line = fgets($file)) {
    $accounts[] = explode('=', explode(' ', trim($line))[0])[1];
}
fclose($file);
header('Content-Type: application/json');
echo json_encode($accounts);
?>
