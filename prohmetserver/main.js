$(document).ready(function () {
    // Oturumdaki kullanıcı adını çekmek için
    $.get('get_current_username.php', function (currentUsername) {
        function loadFiles() {
            $.get('get_uploaded_files.php', function (files) {
                let fileTable = $('#fileTable tbody');
                fileTable.empty();
                files.forEach(file => {
                    fileTable.append(`
                        <tr>
                            <td>${file.name}</td>
                            <td>${file.size}</td>
                            <td>${file.upload_date}</td>
                            <td>${file.username}</td>
                            <td><a href="dosyalar/genel_dosyalar/${file.name}" download>İndir</a></td>
                            <td><button class="delete" data-file="${file.name}">Sil</button></td>
                        </tr>
                    `);
                });

                $('.delete').click(function () {
                    let fileName = $(this).data('file');
                    $.post('delete_file.php', { file: fileName }, function () {
                        loadFiles();
                    });
                });
            }, 'json');
        }

        function loadAccounts() {
            $.get('get_accounts.php', function (accounts) {
                let accountsUl = $('#accounts-ul');
                accountsUl.empty();
                accounts.forEach(account => {
                    accountsUl.append(`<li>${account} ${account === currentUsername ? '(sen)' : ''}</li>`);
                });
            }, 'json');
        }

        $('#uploadForm').on('submit', function (e) {
            e.preventDefault();
            var formData = new FormData(this);
            $.ajax({
                xhr: function () {
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function (event) {
                        if (event.lengthComputable) {
                            var percentComplete = (event.loaded / event.total) * 100;
                            $('#progress').show();
                            $('#progress-bar').css('width', percentComplete + '%');
                            $('#progress-text').text(Math.round(percentComplete) + '%');
                        }
                    }, false);
                    return xhr;
                },
                url: 'upload_file.php',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function () {
                    $('#progress').hide();
                    $('#progress-bar').css('width', '0%');
                    $('#progress-text').text('0%');
                    loadFiles();
                }
            });
        });

        $('#accounts-btn').click(function () {
            $('#accounts-list').toggle();
            loadAccounts();
        });

        // Dosya listesini her 1 saniyede bir güncelle
        setInterval(loadFiles, 1000);

        loadFiles(); // Sayfa yüklendiğinde dosya listesini yükle
    });
});
