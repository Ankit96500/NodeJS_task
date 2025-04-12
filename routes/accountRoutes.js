
import { Router } from "express";
import {signupUser,loginUser} from "../controllers/account.js";



const route = Router();



route.post('/login-user',loginUser);


route.post('/signup-user',signupUser);


export default route