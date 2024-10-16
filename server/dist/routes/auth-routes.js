import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = Router();
// Login route with detailed logs
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Login attempt: username=${username}, entered password=${password}`);
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log(`User ${username} not found`);
            return res.status(403).json({ message: 'Invalid username or password' });
        }
        console.log(`Stored hashed password for ${username}: ${user.password}`);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", isMatch);
        if (!isMatch) {
            console.log("Password does not match for user:", username);
            return res.status(403).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`Login successful for ${username}, token: ${token}`);
        return res.json({ token });
    }
    catch (error) {
        console.error('Error in login route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// Signup route with detailed logs
export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Signup attempt with username: ${username}`);
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            console.log(`User ${username} already exists`);
            return res.status(400).json({ message: 'Username already taken' });
        }
        const newUser = await User.create({ username, password });
        const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`Signup successful for ${username}, token: ${token}`);
        return res.status(201).json({ token });
    }
    catch (error) {
        console.error('Error in signup route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// Register routes
router.post('/login', login);
router.post('/signup', signup);
export default router;
