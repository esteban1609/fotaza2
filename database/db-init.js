require("dotenv").config();

const sequelize = require("../src/config/sequelize");

async function initDatabase() {
    try {

        await sequelize.sync({ alter: true });

        console.log("Base de datos inicializada correctamente");

        process.exit();

    } catch (error) {

        console.error("Error inicializando base de datos:", error);

        process.exit(1);
    }
}

initDatabase();