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

    createVerificationToken(payload){
        const JWT_AUTH_SECRET = process.env.JWT_ACCESS_SECRET;
        const verificationToken = jwt.sign(payload, JWT_AUTH_SECRET, {
            expiresIn: '1h'
        });
        return verificationToken;
    }
}

module.exports = new TokenService();