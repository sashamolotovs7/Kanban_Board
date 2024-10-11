import express from 'express';
import { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket, getAvailableDates, // Import the function
 } from '../../controllers/ticket-controller.js';
const router = express.Router();
// Routes definition...
router.get('/available-dates', getAvailableDates); // Use the new route
// Other routes...
router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.post('/', createTicket);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);
export { router as ticketRouter };
