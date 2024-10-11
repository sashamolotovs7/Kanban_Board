import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './models/index.js';
import authRoutes from './routes/auth-routes.js';
import apiRoutes from './routes/api/index.js';
// This line will get the current file path and then use it to set the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Configure dotenv; ensure the path is correct especially if the .env file is in the server directory but not in the root of your project
dotenv.config({ path: path.resolve(__dirname, '../.env') });
// Improved Environment Variables logging to confirm loading
console.log("Environment Variables Loaded:");
console.log(`DB_NAME: ${process.env.DB_NAME}`);
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_PORT: ${process.env.DB_PORT}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);
console.log(`PORT: ${process.env.PORT}`);
const app = express();
const PORT = process.env.PORT || 3001;
// Enable CORS for the frontend at localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
// Serve static files from the client build directory
// Adjust the path as needed if your directory structure is different
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(express.json());
// Use authentication routes
app.use('/auth', authRoutes); // Authentication routes (login, signup)
// Use other API routes
app.use('/api', apiRoutes); // Other API routes (tickets, users)
// Serve index.html for any other routes (SPA routing for React)
app.get('*', (_req, res) => {
    // Log the request path for debugging purposes
    console.log(`Received request for: ${_req.path}`);
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
// Sync database and start the server
sequelize.sync({ force: false })
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
    console.log("Database synced. All tables created successfully.");
})
    .catch((error) => {
    console.error("Error syncing database:", error);
});
