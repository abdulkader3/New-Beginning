import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
      userName: {
        type: String,
        required: true,
        lowercase: true,
        time: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        time: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
        time: true,
        index: true
    },
    userPhoto: {
        type: String, //url from cloudniry 
    },
    password: {
        type: String,
        required: [true, "password id required"],
    },
    refreshToken: {
        type: String,
    }
},{timestamps: true});



userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next;

    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(this.password, password)
};

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};


export const User = mongoose.model("User", userSchema);