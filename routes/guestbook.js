const { Router } = require('express');
const router = new Router();

const { getComments, getUserFromId, addComment } = require('../models/database-functions');

router.get('/get',  async (req, res) => {
    const comments = await getComments();
    let resObj = {
        comments: comments,
        success: true
    }

    res.send(JSON.stringify(resObj));
});

router.post('/add', async (req, res) => {
    const user = await getUserFromId(req.body.userId);
    const result = await addComment(req.body, user.username)

    let resObj = {
        success: true
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;