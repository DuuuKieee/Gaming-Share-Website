const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const accessTokensecret = process.env.ACCESS_SECRET;
const refreshTokensecret = process.env.REFRESH_SECRET;

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokensecret, (err, payload) => {
            if (err) {
                res.status(401).send('Invalid token');
            } else {
                req.user = payload;
                req.role = payload;
                next();
            }
        });
    } else {
        res.status(401).send('No token provided');
    }
};

function convertJWTToJS(accessToken) {
    const tokenParts = accessToken.split(".");
    const header = atob(tokenParts[0]);
    const body = atob(tokenParts[1]);
    const signature = tokenParts[2];

    return {
        header,
        body,
        signature,
    };
}

module.exports = {
    jwtMiddleware,
    convertJWTToJS,
    sign: jwt.sign,
};