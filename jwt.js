const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const accessTokensecret = process.env.ACCESS_SECRET;
const refreshTokensecret = process.env.REFRESH_SECRET;

const jwtMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    jwt.verify(token, accessTokensecret, (err, payload) => {
        if (err) {
            res.status(401).send('Invalid token');
        } else {
            req.user = payload;
            req.role = payload;
            next();
        }
    });
};

function convertJWTToJS(accessToken) {
    return jwt.verify(req.body.token, process.env.ACCESS_SECRET);
}

module.exports = {
    jwtMiddleware,
    convertJWTToJS,
    sign: jwt.sign,
};