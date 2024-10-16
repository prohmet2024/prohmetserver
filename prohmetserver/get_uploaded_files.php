<?php
$files = [];
$file = fopen('uploaded_files.txt', 'r');
while ($line = fgets($file)) {
    $files[] = json_decode($line, true);
}
fclose($file);
header('Content-Type: application/json');
echo json_encode($files);
?>
