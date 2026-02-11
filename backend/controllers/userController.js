import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user (after register the user if same user want to login).
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){  //if user do not exists in db.
            return res.json({success:false,message: "User does not exist"})
        }
        //if password of login user is already in the database.
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

    // validating email format & strong password
    //“If the email provided by the user is NOT a valid email format, then stop everything and send an error response.”
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name : name, email : email, password: hashedPassword})
        const user = await newUser.save()  //save new user in the data base.
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser, registerUser}