import { Ticket } from '../models/ticket.js';
export const seedTickets = async () => {
    try {
        console.log('Seeding tickets...');
        const tickets = await Ticket.bulkCreate([
            { name: 'Design landing page', status: 'In Progress', description: 'Create wireframes and mockups for the landing page.', assignedUserId: 1 },
            { name: 'Set up project repository', status: 'Done', description: 'Create a new repository on GitHub and initialize it with a README file.', assignedUserId: 2 },
            { name: 'Implement authentication', status: 'To Do', description: 'Set up user authentication using JWT tokens.', assignedUserId: 1 },
        ]);
        console.log('Tickets seeded successfully:', tickets.map(ticket => ticket.toJSON()));
    }
    catch (error) {
        console.error('Error seeding tickets:', error);
    }
};
//# sourceMappingURL=ticket-seeds.js.map