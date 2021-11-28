const jwt = require('jsonwebtoken');
class TokenService{
    createVerificationToken(payload){
        const JWT_AUTH_SECRET = process.env.JWT_ACCESS_SECRET;
        const verificationToken = jwt.sign(payload, JWT_AUTH_SECRET, {
            expiresIn: '1h'
        });
        return verificationToken;
    }

    async checkVerificationToken(token){
        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        return jwt.verify(token, JWT_ACCESS_SECRET);
    }

    createAccessToken(payload){
        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
            expiresIn: '7d'
        });
        return accessToken;
    }

    async verifyAccessToken(token){
        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        return jwt.verify(token, JWT_ACCESS_SECRET);
    }
}

module.exports = new TokenService();