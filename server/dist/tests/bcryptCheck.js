import bcrypt from 'bcrypt';
export const seedUsers = async () => {
    console.log('Seeding users...');
    const users = [
        { username: 'SunnyScribe', password: 'password' },
        { username: 'JollyGuru', password: 'password123' },
        { username: 'RadiantComet', password: 'password1' },
        { username: 'TestUser', password: 'password2' }, // Changed 'password3' to 'password2' to align with your original seed data
    ];
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log(`Hashed password for ${user.username}: ${hashedPassword}`);
        // Immediately check the hashed password
        const isMatch = await bcrypt.compare(user.password, hashedPassword);
        console.log(`Password check for ${user.username}: ${isMatch ? "Success" : "Failure"}`);
        // Optionally create user in the database (commented out for safety during tests)
        // await User.create({ username: user.username, password: hashedPassword });
    }
};
seedUsers().catch(console.error);
