const jwt = require('jsonwebtoken');
const { getUser } = require('../models/database-functions');
const { refreshToken } = require('../models/token');

module.exports = {
    async user(req, res, next) {
        //Verifiera om token är valid och i så fall hämta användare och returnera
        //Annars neka åtkomst och returnera fel på requesten
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const data = jwt.verify(token, 'a1b1c1');
            console.log('----------------------');
            console.log('Data from jwt.verify ', data);
            const user = await getUser(data);
            console.log('----------------------');
            console.log('User from database: ', user);
            
            req.token = refreshToken(user);
            req.user = user;
            console.log('----------------------');
            console.log('Before next function');
            next(); //Säger att express kan gå vidare till nästa parameter i endpoint:en
        } catch (error) {
            //Fånga fel och returnera ett svar
            res.status(401).send(JSON.stringify({ success: false, error: 'Token not valid' }));
        }
    },

    async admin(req, res, next) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const data = jwt.verify(token, 'a1b1c1');
            console.log('Data from jwt.verify ', data);
            const user = await getUser(data);
            console.log('User from database: ', user);
            if(user.role !== 'admin') {
                throw new Error();
            }
            
            req.user = user;

            next(); //Säger att express kan gå vidare till nästa parameter i endpoint:en
        } catch (error) {
            res.status(401).send(JSON.stringify({ success: false, error: 'Token not valid' }));
        }
    }
}