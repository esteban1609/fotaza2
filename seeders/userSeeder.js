const bcrypt = require("bcrypt");
const User = require("../src/models/User");

const seedUsers = async () => {

    const adminExists = await User.findOne({
        where: {
            email: "IgnacioAdmin@gmail.com"
        }
    });

    if (!adminExists) {

        await User.create({

            username: "admin",

            email: "admin@fotaza.com",

            password_hash: await bcrypt.hash(
                "admin123",
                10
            ),

            role: "admin"
        });
    }

    const userExists = await User.findOne({
        where: {
            email: "usuario@gmail.com"
        }
    });

    if (!userExists) {

        await User.create({

            username: "usuario",

            email: "usuario@fotaza.com",

            password_hash: await bcrypt.hash(
                "12345678",
                10
            )
        });
    }

    console.log("Usuarios creados");
};

module.exports = seedUsers;