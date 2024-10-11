// src/pages/Signup.tsx
import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { signup } from "../api/authAPI";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Log the form data to ensure that both username and password are populated
    console.log("Attempting to signup with:", signupData);

    try {
      const data = await signup(signupData);
      Auth.login(data.token); // Assuming this stores the token in localStorage
      navigate('/'); // Navigate to main or dashboard page after successful signup
    } catch (err) {
      console.error('Failed to signup', err);
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={signupData.username || ''}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={signupData.password || ''}
          onChange={handleChange}
          required
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
  );
};

export default Signup;
