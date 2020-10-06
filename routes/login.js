const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = new Router();

const { getUserFromUsername, test } = require('../models/database-functions');
const { matchPassword } = require('../models/hashPassword');

router.post('/login', async (req, res) => {
    //Get username and password
    const body = req.body;
    console.log(body);

    let resObj = {
        success: false
    }
    //console.log(JSON.parse(body.password));
    //let result = await test(body);
    //console.log('HACKING: ', result);
    //Get user from database
    const user = await getUserFromUsername(body);
    console.log(user);
    //Compare password in database to the password entered by user
    const isAMatch = await matchPassword(body.password, user.password);
    console.log('isAMatch: ', isAMatch);
    if (user && isAMatch) {

        //If it's a match sign a jwt token
        const token = jwt.sign({ uuid: user.uuid }, 'a1b1c1', {
            expiresIn: 600 //Expires in 10 min
        })
        resObj.success = true;
        resObj.token = token;
    }

    res.send(JSON.stringify(resObj));
});

router.get('/isloggedin', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    let resObj = {
        isLoggedIn: false
    }

    if (token !== 'null') {
        const user = jwt.verify(token, 'a1b1c1');

        if (user) {
            resObj.isLoggedIn = true;
            resObj.user = user;
        }
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;