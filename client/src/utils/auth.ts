// /client/src/utils/auth.ts

interface JwtPayload {
  exp: number;  // Expiration timestamp field
  username?: string;  // Optional username field
}

class AuthService {
  private timerID: ReturnType<typeof setTimeout> | undefined;  // Timer for inactivity
  private inactivityPeriod: number;  // 30 seconds for inactivity period
  private lastActivityTime: number = Date.now();  // Track user activity time

  constructor() {
    this.inactivityPeriod = 30000; // 30 seconds for inactivity period
  }

  // Start inactivity timer
  startTimer(): void {
    if (this.timerID !== undefined) {
      clearTimeout(this.timerID);  // Clear any existing timer
    }

    this.lastActivityTime = Date.now();  // Reset last activity time

    this.timerID = setTimeout(() => {
      if (this.loggedIn()) {
        this.logout();  // Log out user due to inactivity
      }
    }, this.inactivityPeriod);
  }

  // Get remaining inactivity time
  getInactivityTimeRemaining(): number {
    const elapsedTime = Date.now() - this.lastActivityTime;  // Time since last activity
    return Math.max(0, (this.inactivityPeriod - elapsedTime) / 1000);  // Time left in seconds
  }

  // Check if user is logged in
  loggedIn(): boolean {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      return false;
    }
    this.startTimer();  // Restart the inactivity timer when logged in
    return true;
  }

  // Check if the token has expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded: JwtPayload = JSON.parse(atob(token.split('.')[1]));
      return decoded.exp ? decoded.exp * 1000 < Date.now() : false;
    } catch (err) {
      return true;  // Assume expired if there's an error
    }
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  // Login and save token
  login(idToken: string): void {
    localStorage.setItem('id_token', idToken);
    this.startTimer();  // Start inactivity timer on login
    window.location.assign('/');  // Redirect to home page
  }

  // Logout, clear token and redirect to login
  logout(): void {
    if (this.timerID !== undefined) {
      clearTimeout(this.timerID);  // Clear inactivity timer
    }
    localStorage.removeItem('id_token');  // Remove token
    window.location.assign('/login');  // Redirect to login page
  }

  // Get time remaining for the JWT
  getTimeRemaining(): number {
    const token = this.getToken();
    if (!token) return 0;
    const decoded: JwtPayload = JSON.parse(atob(token.split('.')[1]));
    const timeRemaining = decoded.exp * 1000 - Date.now();
    return Math.max(0, timeRemaining / 1000);  // Return in seconds
  }
}

export default new AuthService();
