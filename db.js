var userModel = require('./models/user');
var gameModel = require('./models/game');

const Sequelize = require('sequelize');
//database username   password
const sequelize = new Sequelize('gamedb', 'postgres', 'ghastb0i', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433
})

sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)

var User = userModel(sequelize, Sequelize.DataTypes);
var Game = gameModel(sequelize, Sequelize.DataTypes);

module.exports = { sequelize, User, Game };