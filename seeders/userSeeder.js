
const bcrypt = require("bcrypt");
const User = require("../src/models/User");

const userSeeder = async () => {
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("12345678", 10);

    await User.findOrCreate({
        where: { username: "admin" },
        defaults: {
            username: "admin",
            email: "admin@fotaza.com",
            password_hash: adminPassword,
            role: "admin",
            profile_image: "https://i.pravatar.cc/150?img=1"
        }
    });

    await User.findOrCreate({
        where: { username: "usuario" },
        defaults: {
            username: "usuario",
            email: "usuario@fotaza.com",
            password_hash: userPassword,
            role: "user",
            profile_image: "https://i.pravatar.cc/150?img=2"
        }
    });

    console.log("Usuarios de prueba verificados correctamente");
};

module.exports = userSeeder;
