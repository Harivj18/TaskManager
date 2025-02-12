const jwt = require('jsonwebtoken');
const users = require('../models/userModel')

const routesAuthentication = async (req, res, next) => {
    try {
        const sessionToken = req.cookies.sessionToken;

        if (!sessionToken) {
            return res.status(500).send({
                "status": "Failed",
                "message": "User Session is not Active"
            })
        }

        const validateSession = await jwt.verify(sessionToken, process.env.JWT_SECRET_KEY);

        if (!validateSession) {
            return res.status(500).send({
                "status": "Failed",
                "message": "Invalid Session of User"
            })
        }


        const loggedUser = await users.findOne({'userName': validateSession.userName}).select('-password');

        if (!loggedUser) {
            return res.status(401).send({
                "status": "Failed",
                "message": "Invalid User"
            })
        }

        req.user = loggedUser;

        console.log('Info for Logged User');

        next()


    } catch (error) {
        console.log('authMiddleware.js : routesAuthentication => Error while authenticating middleware routes',error);
        return res.status(500).send({
            "status": "Failed",
            "message": "Unable to auth Roues"
        })
    }
}