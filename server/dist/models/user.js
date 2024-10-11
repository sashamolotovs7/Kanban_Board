import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
// Define the User model class
export class User extends Model {
    // Instance method to compare the password with the hashed password
    async comparePassword(plainPassword) {
        return await bcrypt.compare(plainPassword, this.password);
    }
}
// Factory function to initialize the User model
export function UserFactory(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure username is unique
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'users', // Set the table name in the database
        sequelize, // Pass the Sequelize instance
        hooks: {
            // Hook to hash the password before saving a new user
            beforeCreate: async (user) => {
                console.log('Hashing password for user:', user.username);
                user.password = await bcrypt.hash(user.password, 10);
                console.log('Password hashed for user:', user.username);
            },
            // Hook to hash the password before updating the user if the password is changed
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    console.log('Updating password for user:', user.username);
                    user.password = await bcrypt.hash(user.password, 10);
                    console.log('Password updated for user:', user.username);
                }
            },
        },
    });
    return User;
}
