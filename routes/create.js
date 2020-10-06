const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');
const router = new Router();

const { addUser } = require('../models/database-functions');
const { hashPassword } = require('../models/hashPassword');

/*
    1. Ta emot användarnamn och lösenord i body
    2. Hasha lösenord med bcrypt
    3. Generera uuid
    4. Lägg till användare i databasen
    5. Signera JWT token
    6. Skicka tillbaka token till klienten
*/

//Endpoint för skapa konto
router.post('/', async (req, res) => {
    let body = req.body;

    let resObj = {
        success: false
    }

    //Hasha lösenord och spara i en variabel
    const passwordHash = await hashPassword(body.password);
    console.log(passwordHash);
    //Lägg till användare i databasen med användarnamn och de hashade lösenordet
    const uuid = uuidv4();
    const userCreated = await addUser(uuid, body.username, passwordHash);

    if (userCreated) {
        const token = jwt.sign({ id: uuid }, 'a1b1c1', {
            expiresIn: 600 //Token expires in 10 min
        });
        resObj.success = true;
        resObj.token = token;
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;