import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
export const seedUsers = async () => {
    try {
        console.log('Seeding users...');
        const users = [
            { username: 'SunnyScribe', password: 'password' },
            { username: 'JollyGuru', password: 'password123' },
            { username: 'RadiantComet', password: 'password1' },
            { username: 'TestUser', password: 'password3' },
        ];
        for (const user of users) {
            // Hash the password before storing it in the database
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await User.create({ username: user.username, password: hashedPassword });
            console.log(`Hashed password for ${user.username}: ${hashedPassword}`);
        }
        console.log('Users seeded successfully.');
    }
    catch (error) {
        console.error('Error seeding users:', error);
    }
};
//# sourceMappingURL=bcryptCheck.js.map