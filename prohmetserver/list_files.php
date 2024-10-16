<?php
$dir = 'dosyalar/genel_dosyalar';
$files = array_diff(scandir($dir), array('.', '..'));
$result = [];

foreach ($files as $file) {
    $file_info = [
        'filename' => $file,
        'username' => file_get_contents("$dir/$file.user")
    ];
    $result[] = $file_info;
}

echo json_encode($result);
?>
