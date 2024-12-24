import { checkPassword, hashPassword } from "../../Utils/EncrpytDycrpt.js";
import {generateAccessToken, generateRefreshToken} from '../../Utils/AccessKey.js'
import cookieParser from "cookie-parser";
import { user } from "../Models/User/User.model.js";

async function createUser(req, res) {
  try {
    console.log("in Sign Up");

    const { name, email, password, DOB, currentWeight } = req.body;
    console.log(name, email, password, DOB, currentWeight);

    // Check if all required fields are provided
    if (!name || !email || !password || !DOB || !currentWeight) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await user.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
      DOB,
      currentWeight,
    });
    console.log("sending res");

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function checkUser(req, res) {
  try {
    const { email, password } = req.body;
    const userData = await user.findOne({ email });
    // console.log(userData);
    const isPassword = await checkPassword(userData.password, password);
    if (isPassword) {
        const userPayload ={...userData.toObject()}
        const accessToken = generateAccessToken(userPayload)
        const refreshToken = generateRefreshToken(userPayload)
        res.cookie('refreshToken', refreshToken , {httponly : true , secure : false})
        console.log("refresh token sent : ", refreshToken);
        
      res.status(200).json({
        message:"Login Successfull",
        accessToken,
        userData
      })
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export { createUser, checkUser };
