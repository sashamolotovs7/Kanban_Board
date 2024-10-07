// /client/src/utils/auth.ts
class AuthService {
    // Check if the user is logged in
    loggedIn() {
        const token = this.getToken(); // Get token from localStorage
        return !!token && !this.isTokenExpired(token); // Check if token exists and is not expired
    }
    // Check if the token has expired
    isTokenExpired(token) {
        try {
            // Decode the token payload to get its expiration
            const decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.exp ? decoded.exp * 1000 < Date.now() : false; // Check expiration date
        }
        catch (err) {
            return false; // If token is malformed or cannot be decoded
        }
    }
    // Get the token from localStorage
    getToken() {
        return localStorage.getItem('id_token'); // Retrieve token from localStorage
    }
    // Save token to localStorage and redirect to the homepage
    login(idToken) {
        localStorage.setItem('id_token', idToken); // Store token in localStorage
        window.location.assign('/'); // Redirect to home after login
    }
    // Remove token from localStorage and redirect to login page
    logout() {
        localStorage.removeItem('id_token'); // Remove token
        window.location.assign('/login'); // Redirect to login page
    }
}
export default new AuthService();
//# sourceMappingURL=auth.js.map