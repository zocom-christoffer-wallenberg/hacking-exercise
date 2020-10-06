const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('users.json')
const database = low(adapter)

module.exports = {
    async getUser(user) {
        return await database.get('users').find({ uuid: user.uuid }).value();
    },

    async getUserFromId(id) {
        return await database.get('users').find({ id: parseInt(id) }).value();
    },

    async getUserFromUsername(user) {
        return await database.get('users').find({ username: user.username }).value();
    },
    
    async addUser(uuid, user, pass) {
        return await database.get('users').push({ uuid: uuid, username: user, password: pass, role: 'user' }).write();
    },

    async test(credentials) {
        return await database.get('users').find({ username: credentials.username, password: JSON.parse(credentials.password) });
    },

    async getComments() {
        return await database.get('comments').value();
    },

    async addComment(comment, user) {
        return await database.get('comments').push({ text: comment.text, author: user }).write();
    }
}