require("dotenv").config();

const sequelize = require("../src/config/sequelize");

const userSeeder = require("./userSeeder");

const runSeeders = async () => {

    try {

        await sequelize.authenticate();

        console.log("Base conectada");

        await userSeeder();

        console.log("Seed completada");

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);
    }
};

runSeeders();