import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UploadOnCloudinary } from "../utils/Cloudinary.js";



// token generator
const generateAccessTokenAndRefreshToken = async (userId)=>{
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500, error?.message, 'Something went wrong while generating access token and refreshed token 😑sorry about that sir')
    }
};


// user register
const userRegister = asyncHandler( async (req,res)=>{

    // get user data from front-end
    const {userName,fullName,email,password} = req.body;
    console.log(userName,fullName,email,password)

    //Validation
    if([userName,fullName,email,password].some((filed)=> filed.trim() === '')){
        throw new ApiError(400, 'All filed are required.')
    }

    console.log("1")
    // Existed user
    const existedUser = await User.findOne({
        $or: [{email}, {userName}]
    })
    console.log("2")
    if(existedUser){
        throw new ApiError(400, 'User with email or username already exist')
    }
    console.log("3")


    // check Image local path
    let userPhotoLocalPath;
    if(req.files && Array.isArray(req.files.userPhoto) && req.files.userPhoto.length >0){
        userPhotoLocalPath = req.files.userPhoto[0].path;
    }
    console.log("4")
  

    // Upload Image files in cloud
    const userPhoto = await UploadOnCloudinary(userPhotoLocalPath);
    console.log("5")

    // create user Object -entry in db
    const user = await User.create(
        {
            userName: userName.toLowerCase(),
            fullName,
            email,
            password,
            userPhoto: userPhoto?.url || '',
            
        }
    )
    console.log("6")

    // remove password and refresh token from response
    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check user creation
    if(!userCreated){
        throw new ApiError(500, 'Something went wrong while registering user')
    }

    // Return response
    return res.status(201).json(
        new ApiResponse(200, userCreated, 'User registered successfully 😊')
    )
} )


export{
    userRegister
}