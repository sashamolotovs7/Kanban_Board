import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from '../models/index.js';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

// Function to test password matching
const testPasswordMatchFromDB = async () => {
  try {
    // Authenticate connection to the database
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    const username = 'SunnyScribe';
    const password = 'password'; // The password you think should match
    const user = await User.findOne({ where: { username } });

    if (user) {
      const hashFromDB = user.password; // Grab the hashed password from DB
      const isMatch = await bcrypt.compare(password, hashFromDB);
      console.log(`Testing password match directly from DB for ${username}:`, isMatch);
    } else {
      console.log(`User ${username} not found.`);
    }
  } catch (error) {
    console.error('Error connecting to database or fetching user:', error);
  }
};

testPasswordMatchFromDB();
