const jwt = require('jsonwebtoken');
class TokenService{
    createToken(payload){
        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
            expiresIn : '1h'
        });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn : '1y'
        });
        return {accessToken , refreshToken};
    }

    createAuthToken(payload){
        const JWT_AUTH_SECRET = process.env.JWT_ACCESS_SECRET;
        const authToken = jwt.sign(payload, JWT_AUTH_SECRET, {
            expiresIn: '24h'
        });
        return authToken;
    }
}

module.exports = new TokenService();