<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['file'])) {
    $file = $_POST['file'];
    $filePath = 'dosyalar/genel_dosyalar/' . $file;

    if (file_exists($filePath)) {
        unlink($filePath);
        $files = file('uploaded_files.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $files = array_filter($files, function($line) use ($file) {
            $data = json_decode($line, true);
            return $data['name'] !== $file;
        });
        file_put_contents('uploaded_files.txt', implode("\n", $files));
    }
}
?>
