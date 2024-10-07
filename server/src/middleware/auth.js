import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        // If there's no token, return a response and end the function
        return res.status(401).json({ message: 'Token missing' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // If token verification fails, return a response and end the function
            return res.status(403).json({ message: 'Invalid token' });
        }
        // Ensure that we attach the user payload to the request object
        req.user = user;
        // Call next to pass the request to the next middleware or route handler
        return next(); // This ensures the function ends properly.
    });
    // Explicit return at the end to satisfy TypeScript's check that all paths return
    return;
};
