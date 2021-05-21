import express from 'express';
const app = express();
import { sequelize as db } from './db.js';
import { router as user } from './controllers/usercontroller.js';
import { router as game } from './controllers/gamecontroller.js';
import { validate } from './middleware/validate-session.js';
const PORT = 4000;

db.sync();
app.use(express.json());
app.use('/api/auth', user);
app.use(validate);
app.use('/api/game', game);
app.listen(PORT, function () {
    console.log("App is listening on 4000");
});