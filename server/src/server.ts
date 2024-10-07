import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './models/index.js';
import authRoutes from './routes/auth-routes.js';
import apiRoutes from './routes/api/index.js';

// Resolve __filename and __dirname in ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for the frontend at localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(express.json());

// Use authentication routes
app.use('/auth', authRoutes);  // Authentication routes (login, signup)

// Use other API routes
app.use('/api', apiRoutes);    // Other API routes (tickets, users)

// Serve index.html for any other routes (SPA routing for React)
app.get('*', (req, res) => {
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
