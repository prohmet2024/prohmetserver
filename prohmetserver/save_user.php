<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['user'];
    file_put_contents('users.txt', $user, FILE_APPEND);
}
?>
