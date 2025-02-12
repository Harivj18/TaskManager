const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const setJWTCookie = require('../utils/generateToken')

const userRegistration = async(req, res) => {
    try {
        console.log('User registration');
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
            return res.status(500).send({
                "status": "Failed",
                "message": "Password Mismatched, Kindly Check it"
            })
        }

        const isUserExists = await users.findOne({userName})

        if (isUserExists) {
            return res.status(500).send({
                "status": "Failed",
                "message": "UserName Already Exists"
            })
        }

        console.log('process.env.GEN_SALT',process.env.GEN_SALT);
        
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
        return res.status(500).send({
            "status": "Failed",
            "message": "Error while creating new User"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        console.log('Login User');
        let {
            userName,
            password
        } = req.body;

        const getUserInfo = await users.findOne({userName});

        if (getUserInfo) {
            const decryptPassword = await bcrypt.compare(password, getUserInfo.password);
            if (decryptPassword) {
                await setJWTCookie(userName, res);
                
                return res.status(200).send({
                    "status": "Success",
                    "message": "User Login Verified"
                })
            } else {
                return res.status(401).send({
                    "status": "Failed",
                    "message": "Invalid Password"
                })
            }
        }
        return res.status(500).send({
            "status": "Failed",
            "message": "Invalid Username / User does not exist"
        })
    } catch (error) {
        console.log('userController.js : loginUser => Error while login user',error);
        return res.status(500).send({
            "status": "Failed",
            "message": "Issue on User Login"
        })
    }
}

module.exports = {userRegistration, loginUser}