import express from 'express';
import {
  login as loginController,
  register as registerController, 
  userProfile as userProfileController
} from '../controllers/user.controller.js';

// Using Express Router
const router = express.Router();

// Set the routing
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/user-profile", userProfileController);

export default router;