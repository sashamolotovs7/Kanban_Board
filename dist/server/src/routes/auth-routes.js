import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = Router();
// Login route
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Log the login attempt
        console.log(`Login attempt: username=${username}, entered password=${password}`);
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log(`User ${username} not found`);
            return res.status(403).json({ message: 'Invalid username or password' });
        }
        // Log the stored hashed password for debugging
        console.log(`Stored hashed password for ${username}: ${user.password}`);
        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        // Log the password comparison result
        console.log('Entered password:', password); // Plaintext password from user input
        console.log('Stored hashed password:', user.password); // Hashed password from database
        console.log('Password match result:', isMatch);
        if (!isMatch) {
            console.log(`Password mismatch for ${username}`);
            return res.status(403).json({ message: 'Invalid username or password' });
        }
        // Log the JWT secret
        console.log('JWT Secret:', process.env.JWT_SECRET);
        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`Login successful for ${username}`);
        // Return the JWT token in the response
        return res.json({ token });
    }
    catch (error) {
        console.error('Error in login route:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// Signup route
export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Signing up with username: ${username}`);
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            console.log(`User ${username} already exists`);
            return res.status(400).json({ message: 'Username already taken' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Hashed password for ${username}: ${hashedPassword}`);
        // Create the new user in the database
        const newUser = await User.create({ username, password: hashedPassword });
        // Log the JWT secret
        console.log('JWT Secret:', process.env.JWT_SECRET);
        // Generate a JWT for the new user
        const token = jwt.sign({ username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`Signup successful for ${username}`);
        // Return the JWT token in the response
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
//# sourceMappingURL=auth-routes.js.map