import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

// Define the attributes of the Ticket model
interface TicketAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedUserId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define optional attributes for creating a ticket (like ID is optional)
interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> { }

// Ticket class representing the tickets table
export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public description!: string;
  public assignedUserId!: number;

  // associated User model
  public readonly assignedUser?: User;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Factory function to define the Ticket model
export function TicketFactory(sequelize: Sequelize): typeof Ticket {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Automatically set creation time
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Automatically set update time
      },
    },
    {
      tableName: 'tickets',
      sequelize,
    }
  );

  // Optionally associate Ticket with the User model
  Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });

  return Ticket;
}
