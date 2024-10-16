document.addEventListener("DOMContentLoaded", function() {
    const registerLink = document.getElementById("register-link");
    const loginLink = document.getElementById("login-link");
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    if (registerLink) {
        registerLink.addEventListener("click", function() {
            document.getElementById("login-container").style.display = "none";
            document.getElementById("register-container").style.display = "block";
        });
    }

    if (loginLink) {
        loginLink.addEventListener("click", function() {
            document.getElementById("register-container").style.display = "none";
            document.getElementById("login-container").style.display = "block";
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let newUsername = document.getElementById("new-username").value;
            let newPassword = document.getElementById("new-password").value;
            let confirmPassword = document.getElementById("confirm-password").value;
            
            if (newPassword !== confirmPassword) {
                alert("Şifreler eşleşmiyor!");
                return;
            }

            fetch('users.txt')
                .then(response => response.text())
                .then(data => {
                    if (data.includes(`username=${newUsername}`)) {
                        alert("Böyle bir kullanıcı adı zaten mevcut!");
                    } else {
                        let newUser = `username=${newUsername} password=${newPassword}\n`;
                        fetch('save_user.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: `user=${encodeURIComponent(newUser)}`
                        }).then(() => {
                            alert("Hesap oluşturuldu. Giriş yapabilirsiniz.");
                            document.getElementById("register-container").style.display = "none";
                            document.getElementById("login-container").style.display = "block";
                        });
                    }
                });
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            fetch('users.txt')
                .then(response => response.text())
                .then(data => {
                    let userFound = false;
                    let passwordCorrect = false;

                    data.split('\n').forEach(line => {
                        let [savedUsername, savedPassword] = line.split(' ').map(part => part.split('=')[1]);
                        if (savedUsername === username) {
                            userFound = true;
                            if (savedPassword === password) {
                                passwordCorrect = true;
                            }
                        }
                    });

                    if (!userFound) {
                        alert("Böyle bir kullanıcı yok!");
                    } else if (!passwordCorrect) {
                        alert("Yanlış şifre!");
                    } else {
                        window.location.href = "success.html";
                    }
                });
        });
    }

    passwordToggles.forEach(item => {
        item.addEventListener('click', function() {
            let passwordField = item.previousElementSibling;
            if (passwordField.type === "password") {
                passwordField.type = "text";
            } else {
                passwordField.type = "password";
            }
        });
    });
});
