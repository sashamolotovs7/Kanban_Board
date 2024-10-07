import { User } from '../models/index.js'; // Make sure to import User from the index where it's defined
import bcrypt from 'bcrypt';
const checkPasswords = async () => {
    try {
        console.log("Fetching users from the database...");
        const users = await User.findAll();
        console.log("Fetched users:", users); // Log fetched users to see the result
        // Passwords you expect for each user
        const passwords = [
            { username: 'SunnyScribe', password: 'password' },
            { username: 'JollyGuru', password: 'password123' },
            { username: 'RadiantComet', password: 'password1' },
            { username: 'TestUser', password: 'password3' },
        ];
        // Check each password against the corresponding hash
        for (const user of users) {
            const matchingPassword = passwords.find(p => p.username === user.username);
            if (matchingPassword) {
                const isMatch = await bcrypt.compare(matchingPassword.password, user.password);
                console.log(`Testing user: ${user.username}`);
                console.log('Plaintext password:', matchingPassword.password);
                console.log('Stored hashed password:', user.password);
                console.log('Password match result:', isMatch); // Should print true if correct
                console.log('-------------------');
            }
        }
    }
    catch (error) {
        console.error('Error fetching users from the database:', error);
    }
};
// Execute the password check
checkPasswords();
//# sourceMappingURL=passwordTest.js.map