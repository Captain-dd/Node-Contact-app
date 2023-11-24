const asyncHandler = require("express-async-handler")
const userModel = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')


const registerUser = asyncHandler(async (req, res) => {

    const {username, email, password} = req.body;

    if (!username || !email || !password){
        res.status(400)
        throw new Error("All fields are necessary in registration of user")
    }

    const userAvailable = await userModel.findOne({ email });
    console.log(userAvailable)
    if (userAvailable){
        res.status(400)
        throw new Error("User already present")
    }

    //create hash Password
    const hashedPassword = await bcrypt.hash(password, 10)  // here 10 is salt round

    const createUserInDb = await userModel.create(
        {
            username,
            email,
            password:hashedPassword
        }
    )
    
    if(createUserInDb){
        res.status(200).json({
            _id: createUserInDb.id,
            email: createUserInDb.email
        })
    }

    else{
        throw new Error("Issue in registration of the user")
    }
    
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password){
        res.status(400)
        throw new Error("All fields are necessary in login")
    }

    const user = await userModel.findOne({ email })

    if (user && bcrypt.compare(password, user.password)){

        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN, 
        {
            expiresIn: process.env.EXP_TIME
        })
        res.status(200).json({ accessToken })
    }
    else{

        res.status(401)
        throw new Error("User Credentials are not proper")

    }

    res.status(200).json("Login Done in controller")})


const currentUser = asyncHandler (async (req, res) => {
    res.status(200).json("Current user in controller")
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}