import jwt from 'jsonwebtoken';
import { User } from '../db.js';
import { SECRET } from '../controllers/usercontroller.js';

export function validate(req, res, next) {
    if (req.method == 'OPTIONS') {
        next();   // allowing options as a method for request
    } else {
        const sessionToken = req.headers.authorization;
        console.log(sessionToken);
        if (!sessionToken) {
            return res.status(403).send({ auth: false, message: "No token provided." });
        } else {
            jwt.verify(sessionToken, SECRET, async (err, decoded) => {
                if (decoded) {
                    try {
                        const user = await User.findOne({ where: { id: decoded.id } });
                        if (!user) {
                            res.status(403).send({ error: "not authorized" });
                        } else {
                            req.user = user;
                            next();
                        }
                    } catch {
                        res.status(403).send({ error: "not authorized" });
                    }
                } else {
                    res.status(403).send({ error: "not authorized" });
                }
            });
        }
    }
}