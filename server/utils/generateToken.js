const jwt = require('jsonwebtoken');

const setJWTCookie = async (userName, res) => {
    try {
        // generate jwt token and set the token on cookie for user validation        
        const token = await jwt.sign({userName}, process.env.JWT_SECRET_KEY, {expiresIn: '15d'});

        res.cookie('sessionToken', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "None", 
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