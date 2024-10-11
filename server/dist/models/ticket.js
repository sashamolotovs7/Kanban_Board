import { DataTypes, Model } from 'sequelize';
import { User } from './user.js';
// Ticket class representing the tickets table
export class Ticket extends Model {
}
// Factory function to define the Ticket model
export function TicketFactory(sequelize) {
    Ticket.init({
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
    }, {
        tableName: 'tickets',
        sequelize,
    });
    // Optionally associate Ticket with the User model
    Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });
    return Ticket;
}
