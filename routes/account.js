const { Router } = require('express');
const router = new Router();

const { user, admin } = require('../middleware/auth');

//Vi får i req-objektet användaren från databasen som vi kan skicka tillbaka till klienten
router.get('/get', user, (req, res) => {
    console.log('----------------------');
    console.log('After middleware');
    console.log(req.user);
    let resObj = {
        user: req.user.username,
        role: req.user.role,
        id: req.user.id,
        success: true,
        token: req.token
    }

    res.send(JSON.stringify(resObj));
});


//En enpoint som bara kan nås av användare med adminroll

router.get('/admin', admin, (req, res) => {
    res.send(JSON.stringify({ success: true, message: 'Is admin' }));
});

router.get('/test', admin, (req, res) => {
    res.send(JSON.stringify({ success: true, message: 'Is admin' }));
});

module.exports = router;