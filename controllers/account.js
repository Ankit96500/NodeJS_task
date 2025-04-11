import dotenv from "dotenv";
import User from "../models/user.js";
import JWT from "jsonwebtoken";

import bcrypt from "bcrypt";
const saltRounds = 10;

dotenv.config()

export async function postSignupUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, saltRounds);

    const data = new User({
      password: hashpassword,
      email: email,
    });
    await data.save();
    
    res.status(201).json({status:true,msg:"user created successfully! "});
  } catch (error) {  
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function postLoginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // first check , given email exist or not
    const user = await User.findOne({
      email:email,
    });
    
    // If the user does not exist
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    // If the user exists, compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If the password does not match
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    // If both email and password are correct, send the user data as the response
      JWT.sign({ userID: user._id, email: user.email },process.env.JWT_SECRET_KEY,(err, token) => {
        if (err) {
          res.status(500).json({ error: "token not generated" });
        }
        return res.status(200).json({ token: token });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: "An error occurred during login" });
  }
}


