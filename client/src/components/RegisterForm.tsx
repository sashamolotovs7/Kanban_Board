import { useState, FormEvent, ChangeEvent } from 'react'
import { signup } from '../api/authAPI';
import Auth from '../utils/auth';

const RegisterForm = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await signup(signupData); // Call the signup API
      Auth.login(data.token); // Store JWT in local storage
    } catch (err) {
      console.error('Failed to sign up', err);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={signupData.username}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default RegisterForm;
