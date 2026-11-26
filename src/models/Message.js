const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./User");

const Message = sequelize.define("Message", {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: "messages",
    timestamps: true
});

Message.belongsTo(User, {
    as: "Sender",
    foreignKey: "senderId"
});

Message.belongsTo(User, {
    as: "Receiver",
    foreignKey: "receiverId"
});

User.hasMany(Message, {
    as: "SentMessages",
    foreignKey: "senderId"
});

User.hasMany(Message, {
    as: "ReceivedMessages",
    foreignKey: "receiverId"
});

module.exports = Message;