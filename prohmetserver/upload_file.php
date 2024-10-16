<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $uploadDir = 'dosyalar/genel_dosyalar/';
    $uploadFile = $uploadDir . basename($_FILES['file']['name']);
    $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'anonim';

    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
        $fileDetails = [
            'name' => $_FILES['file']['name'],
            'size' => $_FILES['file']['size'],
            'upload_date' => date("Y-m-d H:i:s"),
            'username' => $username
        ];
        file_put_contents('uploaded_files.txt', json_encode($fileDetails) . "\n", FILE_APPEND);
    }
}
?>
