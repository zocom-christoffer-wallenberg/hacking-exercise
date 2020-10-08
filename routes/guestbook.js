const { Router } = require('express');
const { body } = require('express-validator');
const router = new Router();

const { getComments, getUserFromId, addComment } = require('../models/database-functions');
const { user } = require('../middleware/auth');

router.get('/get',  async (req, res) => {
    const comments = await getComments();
    let resObj = {
        comments: comments,
        success: true
    }

    res.send(JSON.stringify(resObj));
});

router.post('/add', body('text').escape(), user, async (req, res) => {
    const user = await getUserFromId(req.body.userId);
    console.log('COMMENT USER', req.user);
    let resObj = {
        success: false
    }

    if (req.user.id == req.body.userId) {
        const result = await addComment(req.body, user.username);
        resObj.success = true;
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;