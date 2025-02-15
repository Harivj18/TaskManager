const users = require('../models/userModel');
const bcrypt = require('bcryptjs');
const setJWTCookie = require('../utils/generateToken')

const userRegistration = async(req, res) => {
    try {
        let {
            userName,
            firstName,
            lastName,
            emailId,
            mobileNo,
            password,
            confirm_password
        } = req.body;

        if (password !== confirm_password) {
            return res.status(200).send({
                "status": "Failed",
                "message": "Password Mismatched, Kindly Check it"
            })
        }

        const isUserExists = await users.findOne({userName})

        if (isUserExists) {
            return res.status(200).send({
                "status": "Failed",
                "message": "UserName Already Exists"
            })
        }

        
        const genSalt = await bcrypt.genSalt(Number(process.env.GEN_SALT));
        const hashPassword = await bcrypt.hash(password, genSalt);
        password = hashPassword;

        const createUser = new users({
            userName,
            firstName,
            lastName,
            emailId,
            mobileNo,
            password,
        })

        if (createUser) {

            await createUser.save()

            return res.status(201).send({
                "status": "Success",
                "message": "User Created Successfully"
            })
        }
        return res.status(204).send({
            "status": "Failed",
            "message": "User Not Created"
        })
    } catch (error) {
        console.log('userController.js : userRegistration => Error while registering New User',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Error while creating new User"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        let {
            emailId,
            password
        } = req.body;

        const getUserInfo = await users.findOne({emailId});

        if (getUserInfo) {
            const decryptPassword = await bcrypt.compare(password, getUserInfo.password);
            if (decryptPassword) {
                await setJWTCookie(getUserInfo.userName, res);
                
                return res.status(200).send({
                    "status": "Success",
                    "message": "User Login Verified",
                    "userName": getUserInfo.userName
                })
            } else {
                return res.status(200).send({
                    "status": "Failed",
                    "message": "Invalid Password"
                })
            }
        }
        return res.status(200).send({
            "status": "Failed",
            "message": "Invalid Username / User does not exist"
        })
    } catch (error) {
        console.log('userController.js : loginUser => Error while login user',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Issue on User Login"
        })
    }
}

const userLogout = (req, res) => {
    try {
        res.cookie('sessionToken', "", {maxAge: 0});
        return res.status(200).send({
            "status": "Success",
            "message": "User Logout Successfully"
        })
    } catch (error) {
        console.log('userController.js : userLogout => Error while logout user session',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Unable to Logout User"
        })
    }
}

module.exports = {userRegistration, loginUser, userLogout}