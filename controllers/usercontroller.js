import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db.js';

const SALT_OF_ROUNDS = 10;
const EXPIRATION_TIME = 60 * 60 * 24;
const SECRET = 'lets_play_sum_games_man';
const router = express.Router();

const findUser = (req) => User.findOne({ where: { username: req.body.user.username } });

router.post('/signup', async (req, res) => {
    if (await findUser(req)) {
        res.status(400).send({ error: "User whith this name exists." });
    } else {
        try {
            const user = await User.create({
                full_name: req.body.user.full_name,
                username: req.body.user.username,
                passwordHash: bcrypt.hashSync(req.body.user.password, SALT_OF_ROUNDS),
                email: req.body.user.email,
            });
            const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: EXPIRATION_TIME });
            res.status(200).json({
                user: user,
                token: token
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
});

router.post('/signin', async (req, res) => {
    const user = await findUser(req);
    if (user) {
        bcrypt.compare(req.body.user.password, user.passwordHash, function (err, matches) {
            if (matches) {
                const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: EXPIRATION_TIME });
                res.json({
                    user: user,
                    message: "Successfully authenticated.",
                    sessionToken: token
                });
            } else {
                res.status(502).send({ error: "Passwords do not match." });
            }
        });
    } else {
        res.status(403).send({ error: "User not found." });
    }
});

export { router, SECRET };