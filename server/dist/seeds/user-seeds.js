import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
export const seedUsers = async () => {
    try {
        console.log('Seeding users...');
        const plainPasswords = [
            'password',
            'password123',
            'password1',
            'password2'
        ];
        const hashedPasswords = await Promise.all(plainPasswords.map(password => bcrypt.hash(password, 10)));
        const users = await User.bulkCreate([
            { username: 'SunnyScribe', password: hashedPasswords[0] },
            { username: 'JollyGuru', password: hashedPasswords[1] },
            { username: 'RadiantComet', password: hashedPasswords[2] },
            { username: 'TestUser', password: hashedPasswords[3] },
        ], { individualHooks: true });
        console.log('Users seeded successfully:', users.map(user => user.toJSON()));
    }
    catch (error) {
        console.error('Error seeding users:', error);
    }
};
