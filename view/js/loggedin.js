const buttonElem = document.querySelector('#logout');

function getToken() {
    return document.cookie.split('=')[1];
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

    if (!data.isLoggedIn) {
        location.href = '/';
    }
}

function logout() {
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    location.href = '/';
}

buttonElem.addEventListener('click', () => {
    logout();
});

isLoggedIn();