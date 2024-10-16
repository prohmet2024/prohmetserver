<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dosya Yükleme Sistemi</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <h1>Dosya Yükleme Sistemi</h1>
    <div class="account-section">
        <button id="accounts-btn">Mevcut Hesaplar</button>
        <div id="accounts-list" style="display: none;">
            <ul id="accounts-ul"></ul>
        </div>
    </div>
    <form id="uploadForm" enctype="multipart/form-data">
        <input type="file" name="file" required>
        <input type="submit" value="Dosya Yükle">
        <div id="progress" style="display:none;">
            <div id="progress-bar" style="width: 0%; height: 20px; background: green;">
                <span id="progress-text" style="position: absolute; left: 50%; transform: translateX(-50%); color: white;">0%</span>
            </div>
        </div>
    </form>
    <div id="uploaded-files">
        <h2>Yüklenen Dosyalar</h2>
        <table id="fileTable">
            <thead>
                <tr>
                    <th>Dosya Adı</th>
                    <th>Boyut</th>
                    <th>Yükleme Tarihi</th>
                    <th>Yükleyen</th>
                    <th>İndir</th>
                    <th>Sil</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    <script src="main.js"></script>
</body>
</html>
