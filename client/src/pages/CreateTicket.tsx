import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import { retrieveUsers } from '../api/userAPI';
import AuthService from '../utils/auth'; // Ensure path is correct

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState<TicketData | undefined>({
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: 1,
    assignedUser: null
  });

  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[] | undefined>([]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!AuthService.loggedIn()) {
      navigate('/login');
    }

    const getAllUsers = async () => {
      try {
        const data = await retrieveUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to retrieve user info', err);
      }
    };

    getAllUsers();
  }, [navigate]); // Including navigate in the dependency array

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newTicket) {
      const data = await createTicket(newTicket);
      console.log(data);
      navigate('/');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  return (
    <>
      <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1>Create Ticket</h1>
          <label htmlFor='tName'>Ticket Name</label>
          <textarea
            id='tName'
            name='name'
            value={newTicket?.name || ''}
            onChange={handleInputChange}
          />
          <label htmlFor='tStatus'>Ticket Status</label>
          <select
            name='status'
            id='tStatus'
            value={newTicket?.status || ''}
            onChange={handleInputChange}
          >
            <option value='Todo'>Todo</option>
            <option value='In Progress'>In Progress</option>
            <option value='Done'>Done</option>
          </select>
          <label htmlFor='tDescription'>Ticket Description</label>
          <textarea
            id='tDescription'
            name='description'
            value={newTicket?.description || ''}
            onChange={handleInputChange}
          />
          <label htmlFor='tUserId'>Assigned User ID</label>
          <select
            name='assignedUserId'
            id='tUserId'
            value={newTicket?.assignedUserId || ''}
            onChange={handleInputChange}
          >
            {users?.map((user) => (
              <option key={user.id} value={String(user.id)}>
                {user.username}
              </option>
            ))}
          </select>
          <button type='submit'>Submit Form</button>
        </form>
      </div>
    </>
  );
};

export default CreateTicket;
