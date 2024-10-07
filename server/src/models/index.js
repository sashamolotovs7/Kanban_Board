import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from the .env file
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';
// Initialize Sequelize connection using environment variables or defaults
const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    dialect: 'postgres',
    dialectOptions: {
        decimalNumbers: true,
    },
});
// Test the database connection
sequelize.authenticate()
    .then(() => {
    console.log('Database connection established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
// Create models using factory functions
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);
// Define relationships between models
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });
// Sync the database models in order
sequelize.sync({ force: false })
    .then(() => {
    console.log('Database synced successfully.');
})
    .catch((error) => {
    console.error('Error syncing the database:', error);
});
// Export the initialized Sequelize instance and models
export { sequelize, User, Ticket }; // Ensure sequelize is exported here
