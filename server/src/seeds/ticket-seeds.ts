import { Ticket } from '../models/ticket.js'; // Import the Ticket model

// Function to seed tickets
export const seedTickets = async () => {
  try {
    console.log('Seeding tickets...');
    
    // Create multiple ticket entries
    const tickets = await Ticket.bulkCreate([
      { 
        name: 'Design landing page', 
        status: 'In Progress', 
        description: 'Create wireframes and mockups for the landing page.', 
        assignedUserId: 1 // Ensure this user ID exists in the users table
      },
      { 
        name: 'Set up project repository', 
        status: 'Done', 
        description: 'Create a new repository on GitHub and initialize it with a README file.', 
        assignedUserId: 2 // Ensure this user ID exists in the users table
      },
      { 
        name: 'Implement authentication', 
        status: 'To Do', 
        description: 'Set up user authentication using JWT tokens.', 
        assignedUserId: 1 // Ensure this user ID exists in the users table
      },
    ]);

    // Log the seeded tickets
    console.log('Tickets seeded successfully:', tickets.map(ticket => ticket.toJSON()));
  } catch (error) {
    // Log any errors during ticket seeding
    console.error('Error seeding tickets:', error);
  }
};
