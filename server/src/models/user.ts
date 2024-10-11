import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

// Define the creation attributes (since 'id' is auto-generated, it is optional when creating a new User)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number; // '!' makes it non-null after creation
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date; // Sequelize timestamps
  public readonly updatedAt!: Date;

  // Instance method to compare the password with the hashed password
  public async comparePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}

// Factory function to initialize the User model
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
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
    },
    {
      tableName: 'users', // Set the table name in the database
      sequelize, // Pass the Sequelize instance
      hooks: {
        // Hook to hash the password before saving a new user
        beforeCreate: async (user: User) => {
          console.log('Hashing password for user:', user.username);
          user.password = await bcrypt.hash(user.password, 10);
          console.log('Password hashed for user:', user.username);
        },
        // Hook to hash the password before updating the user if the password is changed
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            console.log('Updating password for user:', user.username);
            user.password = await bcrypt.hash(user.password, 10);
            console.log('Password updated for user:', user.username);
          }
        },
      },
    }
  );

  return User;
}
