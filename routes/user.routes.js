import express from 'express';
import userController from '../controllers/user.controller.js';

// Using Express Router
const router = express.Router();

// Set the routing
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", userController.userProfile);

export default router;