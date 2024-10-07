import * as bcrypt from 'bcrypt';

// Example hashed password from the database
const storedHashedPassword = '$2b$10$G3V7QORMf4QqfsrtmHwVNuy10zk4R2vXU9uPsLr41/zK/ttUnyCrq';  // Replace with actual hash
const plainTextPassword = 'password123';  // Replace with actual plaintext password

// Log the stored hash and plaintext password
console.log('Stored hashed password:', storedHashedPassword);
console.log('Plaintext password:', plainTextPassword);

// Asynchronous function to test bcrypt password comparison
async function testPassword() {
  try {
    // Test bcrypt password comparison
    const isMatch = await bcrypt.compare(plainTextPassword, storedHashedPassword);
    
    if (isMatch) {
      console.log('Passwords match!');
    } else {
      console.log('Passwords do not match!');
    }
  } catch (err) {
    console.error('Error during bcrypt comparison:', err);
  }
}

// Call the test function
testPassword();
