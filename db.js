import { userModel } from './models/user.js';
import { gameModel } from './models/game.js';
import Sequelize from 'sequelize';
//database username   password
const sequelize = new Sequelize('gamedb', 'postgres', 'ghastb0i', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433,
    operatorsAliases: false
});

sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
);

const User = userModel(sequelize, Sequelize.DataTypes);
const Game = gameModel(sequelize, Sequelize.DataTypes);

export { sequelize, User, Game };