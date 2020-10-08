const guestbookElem = document.querySelector('#guestbook');

function createComment(comment) {
    const commentWrapper = document.createElement('article');
    const commentText = document.createElement('p');
    const commentAuthor = document.createElement('p');

    commentText.textContent = 'Kommentar: ' + comment.text;
    commentAuthor.textContent = 'Av: ' + comment.author;

    commentWrapper.append(commentText)
    commentWrapper.append(commentAuthor);
    commentWrapper.classList.add('comment');

    guestbookElem.append(commentWrapper);
}

function displayComments(comments) {
    guestbookElem.innerHTML = '';

    comments.forEach(comment => {
        createComment(comment);
    });
}

function getToken() {
    return document.cookie.split('=')[1];
}

function setUserId(id) {
    document.querySelector('#userId').value = id;
}

async function getComments() {
    const url = 'http://localhost:8000/api/guestbook/get';

    const response = await fetch(url, { 
        method: 'GET'
    });
    const data = await response.json();
    displayComments(data.comments);
}

async function addComment(comment) {
    const url = 'http://localhost:8000/api/guestbook/add';

    const response = await fetch(url, { 
        method: 'POST',
        body: JSON.stringify(comment),
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    });
    const data = await response.json();
    getComments();
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
    setUserId(data.id);
}


document.querySelector('#addButton').addEventListener('click', () => {
    let text = document.querySelector('#commentText').value;
    let userId = document.querySelector('#userId').value;

    const obj = {
        text: text.replace(/[&<>]/g, ''),
        userId: userId
    }

    addComment(obj);
});

getComments();
getAccount();