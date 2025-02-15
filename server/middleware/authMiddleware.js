const jwt = require('jsonwebtoken');
const users = require('../models/userModel')

/* routesAuthentication -  Whenever Making routes after login, middleware only allowed if the user session is valid */


const routesAuthentication = async (req, res, next) => { 
    try {
        const sessionToken = req.cookies.sessionToken;

        if (!sessionToken) {
            return res.status(200).send({
                "status": "Failed",
                "message": "User Session is not Active"
            })
        }

        const validateSession = await jwt.verify(sessionToken, process.env.JWT_SECRET_KEY);

        if (!validateSession) {
            return res.status(200).send({
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


        next()


    } catch (error) {
        console.log('authMiddleware.js : routesAuthentication => Error while authenticating middleware routes',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Unable to auth Roues"
        })
    }
}

/* verifyAuthorization - For Restricting the Direct Route to our Home Page without verification */

const verifyAuthorization = async (req, res) => { 
    try {
        const token = req.cookies.sessionToken;
        
        if(!token) {
            return res.json({
                "status": "Error",
                "message": "Invalid Logged User"
            })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!verifyToken) {
            return res.json({
                "status": "ERROR",
                "message": "Invalid User Session"
            })
        }

        return res.json({
            "status": "Success",
            "message": "User Verified"
        })
    } catch (error) {
        console.log('Error while authenticating Protected Routes',error);
        return res.json({
            "status": "ERROR",
            "message": error
        })
    }
}

module.exports = {routesAuthentication, verifyAuthorization};