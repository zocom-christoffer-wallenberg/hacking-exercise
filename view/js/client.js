const buttonElem = document.querySelector('#submit');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#pass');


async function saveToken(token) {
    return new Promise((resolve, reject) => {
        sessionStorage.setItem('auth', token);
        document.cookie = 'auth=' + token;

        resolve('Done');
    });
}

function getToken() {
    return document.cookie.split('=')[1];
}

async function login(username, password) {
    const url = 'http://localhost:8000/api/auth/login';
    const obj = {
        username: username,
        password: password
    }

    const response = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify(obj), 
        headers: { 'Content-Type': 'application/json' } });
    const data = await response.json();

    return await data;
}

async function isLoggedIn() {
    const token = getToken();
    const url = 'http://localhost:8000/api/auth/isloggedin';

    const response = await fetch(url, { 
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    });
    const data = await response.json();

    if (data.isLoggedIn) {
        location.href = 'http://localhost:8000/loggedin.html';
    }
}

buttonElem.addEventListener('click', async () => {
    const user = inputUser.value;
    const pass = inputPass.value;

    let loggedIn = await login(user, pass);

    if (loggedIn.success) {
        await saveToken(loggedIn.token);
        location.href = 'http://localhost:8000/loggedin.html'
    } else {
        document.querySelector('#errorMessage').classList.toggle('hide');
    }
});

isLoggedIn();
