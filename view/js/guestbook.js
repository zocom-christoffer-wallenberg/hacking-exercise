const guestbookElem = document.querySelector('#guestbook');

function createComment(comment) {
    const commentWrapper = document.createElement('article');
    const commentText = document.createElement('p');
    const commentAuthor = document.createElement('p');

    commentText.innerHTML = 'Kommentar: ' + comment.text;
    commentAuthor.innerHTML = 'Av: ' + comment.author;

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
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    getComments();
}

/*<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/128399415&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" 
src="<script>console.log(document.cookie);"
></iframe>*/


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
        text: text,
        userId: userId
    }

    addComment(obj);
});

getComments();
getAccount();