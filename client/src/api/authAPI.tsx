import { UserLogin } from '../interfaces/UserLogin';

// Login function
const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('http://localhost:3001/auth/login', {  // Update to match your routes
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Server responded with:', errorMessage);
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
};

// Signup function
const signup = async (userInfo: { username: string, password: string }) => {
  try {
    const response = await fetch('http://localhost:3001/auth/signup', {  // Ensure this matches your backend route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Server responded with:', errorMessage);
      throw new Error('Signup failed');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Signup error:', err);
    throw err;
  }
};

export { login, signup };
