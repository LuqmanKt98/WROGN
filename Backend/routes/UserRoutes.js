import express from "express";
import { postUserData , loginUser } from "../controllers/userDataController.js";

const router = express.Router();

router.post("/Register", postUserData); // Use a different path for registration
router.post("/Login", loginUser); // Use a different path for login

export default router