const usernameElem = document.querySelector('#username');
const roleElem = document.querySelector('#role');

function getToken() {
    return document.cookie.split('=')[1];
}

function setToken(token) {
    document.cookie = 'auth=' + token;
}

async function getAccount() {
    const url = 'http://localhost:8000/api/account/get';

    const response = await fetch(url, { 
        method: 'GET' ,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
    const data = await response.json();

    setToken(data.token);

    if (data.success) {
        usernameElem.innerHTML = data.user;
        roleElem.innerHTML = data.role;
    }
}


async function admin() {
    const url = 'http://localhost:8000/api/account/admin';

    const response = await fetch(url, { 
        method: 'GET' ,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
    const data = await response.json();

    if (data.success) {
        document.querySelector('#admin-area').classList.toggle('hide');
    }
}

async function clickButton() {
    const url = 'http://localhost:8000/api/account/test';

    const response = await fetch(url, { 
        method: 'GET' ,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
    const data = await response.json();
}

document.querySelector('#send').addEventListener('click', () => {
    clickButton();
});

getAccount();
admin();