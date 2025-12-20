import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';



export const verifyJWT = asyncHandler( async (req, res, next) => {
    try {
        const Token = req.cookies?.refreshToken || req.header("Authorization")?.replace('Bearer ','');

        if(!Token){
            throw new ApiError(401, "no token found" )
        }


        const decodedToken = jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401, 'token expired')
        }

        req.user = user;
        next()


    } catch (error) {
        throw new ApiError(401, error?.message , "invalid refresh token")
    }
} );