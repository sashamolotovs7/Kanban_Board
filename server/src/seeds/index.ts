import { sequelize } from '../models/index.js'; // Import sequelize instance
import { seedUsers } from './user-seeds.js'; // Import user seeding function
import { seedTickets } from './ticket-seeds.js'; // Import ticket seeding function

// Function to seed all data
const seedAll = async (): Promise<void> => {
  try {
    // Sync the database; force true will drop and recreate tables
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    // Seed users and log the result
    console.log('Seeding users...');
    const users = await seedUsers();
    console.log('\n----- USERS SEEDED -----\n', users);

    // Seed tickets and log the result
    console.log('Seeding tickets...');
    const tickets = await seedTickets();
    console.log('\n----- TICKETS SEEDED -----\n', tickets);

    // Exit the process successfully
    process.exit(0);
  } catch (error) {
    // Log any errors during the seeding process
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Start the seeding process
seedAll();
