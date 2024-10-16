<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $folderName = $_POST['folderName'];
    $folderPassword = $_POST['folderPassword'];
    $username = $_POST['username'];
    $folderPath = "dosyalar/kullanici_dosyalari/$username";
    if (!file_exists($folderPath)) {
        mkdir($folderPath, 0777, true);
    }
    $personalFolderPath = "$folderPath/$folderName";
    if (!file_exists($personalFolderPath)) {
        mkdir($personalFolderPath, 0777, true);
        file_put_contents("$personalFolderPath/.password", $folderPassword);
    } else {
        echo "Bu isimde bir dosya zaten var.";
    }
}
?>
