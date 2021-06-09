import { userModel } from './models/user.js';
import { gameModel } from './models/game.js';
import Sequelize from 'sequelize';
                                //database username   password
const sequelize = new Sequelize('BASA', 'ROMA', 'QWER', {
    host: 'db',
    dialect: 'postgres'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to DB");
    } catch (err) {
        console.log(`Error: ${err}`);
    }
})();

sequelize.sync();

const User = userModel(sequelize, Sequelize.DataTypes);
const Game = gameModel(sequelize, Sequelize.DataTypes);

export { User, Game };