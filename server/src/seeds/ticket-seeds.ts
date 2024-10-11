import { Ticket } from '../models/ticket.js'; // Import the Ticket model
import { User } from '../models/user.js'; // Import the User model to access user data

// Function to seed tickets
export const seedTickets = async () => {
  try {
    console.log('Seeding tickets...');

    // Fetch user IDs dynamically
    const users = await User.findAll({
      attributes: ['id'], // Only fetch the 'id' attribute
      order: [['id', 'ASC']] // Order by 'id' ascending to consistently assign tickets
    });

    if (users.length < 2) {
      throw new Error("Insufficient users found in database for ticket assignment.");
    }

    // Create multiple ticket entries, ensuring assignedUserId is from existing users
    const tickets = await Ticket.bulkCreate([
      {
        name: 'Design landing page',
        status: 'In Progress',
        description: 'Create wireframes and mockups for the landing page.',
        assignedUserId: users[0].id  // Use the first user's ID
      },
      {
        name: 'Set up project repository',
        status: 'Done',
        description: 'Create a new repository on GitHub and initialize it with a README file.',
        assignedUserId: users[1].id  // Use the second user's ID
      },
      {
        name: 'Implement authentication',
        status: 'To Do',
        description: 'Set up user authentication using JWT tokens.',
        assignedUserId: users[0].id  // Reuse the first user's ID
      },
    ]);

    // Log the seeded tickets
    console.log('Tickets seeded successfully:', tickets.map(ticket => ticket.toJSON()));
  } catch (error) {
    // Log any errors during ticket seeding
    console.error('Error seeding tickets:', error);
  }
};
