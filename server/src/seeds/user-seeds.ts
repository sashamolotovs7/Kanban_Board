import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const seedUsers = async () => {
  try {
    console.log('Seeding users...');

    // Array of plain text passwords that need to be hashed
    const plainPasswords = [
      'password',
      'password123',
      'password1',
      'password2'
    ];

    // Hashing all passwords using bcrypt and awaiting all promises to resolve
    const hashedPasswords = await Promise.all(
      plainPasswords.map(password => bcrypt.hash(password, 10))
    );

    // Creating user entries with usernames and their corresponding hashed passwords
    const users = await User.bulkCreate([
      { username: 'SunnyScribe', password: hashedPasswords[0] },
      { username: 'JollyGuru', password: hashedPasswords[1] },
      { username: 'RadiantComet', password: hashedPasswords[2] },
      { username: 'TestUser', password: hashedPasswords[3] },
    ], { individualHooks: true }); // Using individualHooks to ensure that any model-level hooks are executed

    // Logging the successfully seeded users
    console.log('Users seeded successfully:', users.map(user => user.toJSON()));
  } catch (error) {
    // Error handling
    console.error('Error seeding users:', error);
  }
};
