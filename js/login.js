document.addEventListener("DOMContentLoaded", function (e) {
    var user;
    const backUrl = 'http://localhost:8080';

    const loginForm = document.getElementById('loginForm');

    loginForm.onsubmit = (e) => {
        e.preventDefault()
        user = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        localStorage.setItem('user', user);
        window.location.href = './';
    };

    const getJSONData = function (endpoint, userData) {
        let url = `${backUrl}${endpoint}`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => {
                alert('Usuario y/o contraseña incorrecta')
            })
            .then(response => {
                console.log('Success:', response)
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', user);
                window.location.href = '/';
            });
    }
});
