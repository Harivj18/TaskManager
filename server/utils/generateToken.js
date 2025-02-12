const jwt = require('jsonwebtoken');

const setJWTCookie = async (userName, res) => {
    try {
        console.log('userNameuserName',userName);
        console.log('process.env.TASK_MANAGER',process.env.JWT_SECRET_KEY);
        
        const token = await jwt.sign({userName}, process.env.JWT_SECRET_KEY, {expiresIn: '15d'});

        res.cookies('sessionToken', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "Strict",
            secure:true
        })

    } catch (error) {
        console.log('generateToken.js : setJWTCookie => Error while setting jwt token on cookie',error);
        return {
            "status": "Failed",
            "message": "Failed to set sessionToken"
        }
    }
}

module.exports = setJWTCookie;