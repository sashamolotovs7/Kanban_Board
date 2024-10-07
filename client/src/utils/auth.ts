// /client/src/utils/auth.ts

// Define the JwtPayload interface for the decoded token
interface JwtPayload {
  exp: number;  // Add 'exp' field which is the expiration timestamp
  username?: string;  // Optional 'username' field (if you're storing it in the JWT payload)
}

class AuthService {
  // Check if the user is logged in
  loggedIn(): boolean {
    const token = this.getToken();  // Get token from localStorage
    return !!token && !this.isTokenExpired(token);  // Check if token exists and is not expired
  }

  // Check if the token has expired
  isTokenExpired(token: string): boolean {
    try {
      // Decode the token payload to get its expiration
      const decoded: JwtPayload = JSON.parse(atob(token.split('.')[1]));
      return decoded.exp ? decoded.exp * 1000 < Date.now() : false;  // Check expiration date
    } catch (err) {
      return false;  // If token is malformed or cannot be decoded
    }
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('id_token');  // Retrieve token from localStorage
  }

  // Save token to localStorage and redirect to the homepage
  login(idToken: string): void {
    localStorage.setItem('id_token', idToken);  // Store token in localStorage
    window.location.assign('/');  // Redirect to home after login
  }

  // Remove token from localStorage and redirect to login page
  logout(): void {
    localStorage.removeItem('id_token');  // Remove token
    window.location.assign('/login');  // Redirect to login page
  }
}

export default new AuthService();
