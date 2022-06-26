import bcrypt from "bcryptjs"
import Users from "../models/Users.js"
import {createError} from "../utils/createError.js";
import jwt from "jsonwebtoken";

//for registering user
const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        //encoding password
        const hash = bcrypt.hashSync(req.body.password, salt)
        //creating user
        const newUser = new Users({
            ...req.body,
            password: hash
        })
        //saving created user
        await newUser.save()
        //sending data of user being created
        res.status(201).send("User has been created!")
    } catch (err) {
        //if any error in process then that error is passed to middleware
        next(err)
    }
}

//for loggin in user
const login = async (req, res, next) => {
    try {
        //finding for user in database by username
        const user = await Users.findOne({username: req.body.username})
        //if no user is found then process stopped and error is thrown as parameter to middleware to handle
        if(!user) return next(createError(404, "User not found"))
        
        //decoding and checking for password. Return is boolean.
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
             user.password
             )
        //if password was incorrect then error is thrown to next middleware
        if(!isPasswordCorrect) 
        return next(createError(400, "Wrong password or username!"))
        
        //if password was correct then a JWT sign token is made
        const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_secret)
        
        const {password, ...otherDetails} = user._doc
        //cookie is send which is later store in localstorage in front-end
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({details: {...otherDetails}})
    } catch (err) {
        // any error in process is send to middleware
        next(err)
    }
}

export { register, login };