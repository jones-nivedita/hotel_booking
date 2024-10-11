import express from 'express';
import { loginUser, registerUser, logoutUser, getUsers, getUserById, getProfile } from "../Controllers/UserController.js";
import { get } from 'mongoose';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/profile', getProfile)

export default router;