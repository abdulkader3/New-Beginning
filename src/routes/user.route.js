import { Router } from "express";
import { userRegister } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router  = Router()

// user Register
router.route("/register").post( upload.fields([
    {name: 'userPhoto', maxCount:1}]) , userRegister)



export default router;