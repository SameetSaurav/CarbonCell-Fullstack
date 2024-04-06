import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken"
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import Web3 from "web3"
import { User } from "../../Models/user.model.js"

dotenv.config()
const JWTsecret = process.env.JWT_SECRET
const bcryptSalt = bcrypt.genSaltSync(10)


const registerUser = ( async (req, res) => {
    try {
        const {username, password} = req.body

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json('User already exists' );
        }

        const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
        const user = await User.create({username, password: hashedPassword})
        jwt.sign({userId: user._id, username}, JWTsecret, {}, (err,token) => {
            if(err) throw err;
            res.cookie('token', token).status(201).json({
                id: user._id
            })
        })
    } catch (error) {
        if(error) throw error
        res.status(500).json('error');
    }
})

const loginUser = ( async (req, res) => {
    try {
        const {username, password} = req.body;
        const foundUser = await User.findOne({username});
        if (foundUser) {
          const passOk = bcrypt.compareSync(password, foundUser.password);
          if (passOk) {
            jwt.sign({userId:foundUser._id,username}, JWTsecret, {}, (err, token) => {
              res.cookie('token', token, {sameSite:'none', secure:true}).json({
                id: foundUser._id,
              });
            });
          }else{
            res.status(401).json("Unauthorized - Invalid credentials");
          }
        }
    } catch (error) {
    }
})

const logoutUser = ( async (req,res) => {
    try {
        res.cookie('token', '', {sameSite:'none', secure:true}).json('User logged out successfully')
    } catch (error) {
        res.status(500).json("Internal server error");   
    }
})

const profileUser = ( async (req,res) => {
    const token = req.cookies?.token
    if(token){
        jwt.verify(token, JWTsecret, {}, (err, userData) => {
            if (err) {
                res.status(401).json({ error: 'Invalid token' })
            } else {
                req.userData = userData
                next()
            }
        })
    } else{
        res.status(401).json("no token")
    } 
})

const apiAuth = ( async (req,res) => {
    res.json(req.userData);
})

const ethereumBalance = ( async (req,res) => {
    const web3 = new Web3('HTTP://127.0.0.1:7545');
    
    try {
        const { address } = req.params;

        const balance = await web3.eth.getBalance(address);

        const balanceInEther = web3.utils.fromWei(balance, 'ether');

        res.status(201).json({ balance: balanceInEther });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve account balance' });
    }
})




export {
    registerUser,
    loginUser,
    logoutUser,
    profileUser,
    apiAuth,
    ethereumBalance
}
