import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);  // For available dates
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [sortBy, setSortBy] = useState('name'); // Default sort by name
  const [filterByDate, setFilterByDate] = useState(''); // Filter by created date

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets({ sortBy, filterByDate }); // Pass sort and filter options
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const fetchAvailableDates = async () => {
    // Fetch available dates for filtering
    const response = await fetch('/api/tickets/available-dates');
    const dates = await response.json();
    setAvailableDates(dates);
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
      fetchAvailableDates();  // Fetch available dates after login
    }
  }, [loginCheck, sortBy, filterByDate]); // Fetch tickets when sort or filter changes

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div className="board">
          <div className="controls">
            {/* Sorting options */}
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="createdAt">Date Created</option>
              <option value="assignedUser">Assigned User</option>
            </select>

            {/* Filtering options by created date */}
            <label htmlFor="filterDate">Filter by Date:</label>
            <select
              id="filterDate"
              value={filterByDate}
              onChange={(e) => setFilterByDate(e.target.value)}
            >
              <option value="">All Dates</option>
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <button type="button" id="create-ticket-link">
            <Link to="/create">New Ticket</Link>
          </button>

          <div className="board-display">
            {boardStates.map((status) => {
              const filteredTickets = tickets.filter((ticket) => ticket.status === status);
              return (
                <Swimlane
                  title={status}
                  key={status}
                  tickets={filteredTickets}
                  deleteTicket={deleteIndvTicket}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
