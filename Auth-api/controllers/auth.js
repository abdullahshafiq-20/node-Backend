import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken";
import UserModel from "../models/userSchema.js";
import nodemailer from "nodemailer";
import OTPModel from "../models/OTPSchema.js";


export const signup = async (req, res) => {

    const { user_name, email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });


        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(hashedPassword);

        const user_obj = {
            ...req.body,
            password: hashedPassword
        }
        const user = await UserModel.create(user_obj);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });


        const otp = Math.floor(100000 + Math.random() * 900000);
        await OTPModel.create({ otp, email });


        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "OTP for email verification",
            text: `Your OTP is ${otp}`
        });




        const token = jwt.sign({ email: user.email, id: user._id }, "PRIVATEKEY");
        res.status(201).json({
            user_info: user,
            token: token,
            message: "successfully signup!"
        })


    } catch (error) {
        res.json({
            message: "Something went wrong"
        })

    }
}

export const signin = async (req, res) => {

    const { email, password } = req.body;
    // res.json({
    //     email,
    //     password
    // })
    try {
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser)
            return res.status(400).json({ message: "User not found!" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id },"PRIVATEKEY");


        res.status(201).json({
            user_info: existingUser,
            token: token,
            message: "successfully signin!"
        })


    } catch (error) {
        res.json({
            message: "Something went wrong"
        })
    }
}


export const verifyOTP = async (req, res) => {
    const { otp, email } = req.body;
    try {
        const existingOTP = await OTPModel.findOne({ otp, email });
        if (!existingOTP)
            return res.status(400).json({ message: "Invalid OTP" });

        if (existingOTP.isUsed)
            return res.status(400).json({ message: "OTP already used" });

        const ress =await OTPModel.findOneAndUpdate({_id: existingOTP._id}, {isUsed: true});

        res.status(201).json({
            message: "OTP verified successfully"
        })

    }
    catch (error) {
        res.json({
            message: "Something went wrong"
        })


    }
}
