import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
// Define the User class
export class User extends Model {
    // Method to compare passwords
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
        tableName: 'users',
        sequelize,
        hooks: {
            beforeCreate: async (user) => {
                console.log('Hashing password for user:', user.username);
                user.password = await bcrypt.hash(user.password, 10);
                console.log('Password hashed for user:', user.username);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    console.log('Updating password for user:', user.username);
                    user.password = await bcrypt.hash(user.password, 10);
                    console.log('Password updated for user:', user.username);
                }
            },
        }
    });
    return User;
}
