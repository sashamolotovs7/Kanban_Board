import { sequelize } from '../models/index.js';
import { seedUsers } from './user-seeds.js';
import { seedTickets } from './ticket-seeds.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate the tables
    console.log('\n----- DATABASE SYNCED -----\n');

    console.log('Seeding users...');
    const users = await seedUsers();
    console.log('\n----- USERS SEEDED -----\n', users);

    console.log('Seeding tickets...');
    const tickets = await seedTickets();
    console.log('\n----- TICKETS SEEDED -----\n', tickets);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
