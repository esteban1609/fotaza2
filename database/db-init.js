require("dotenv").config();

const sequelize = require("../src/config/sequelize");
const seedUsers = require("../seeders/userSeeder");

async function initDatabase() {
    try {

        await sequelize.sync({ alter: true });

        await seedUsers();

        console.log("Base de datos inicializada correctamente");

        process.exit();

    } catch (error) {

        console.error("Error inicializando base de datos:", error);

        process.exit(1);
    }
}


initDatabase();