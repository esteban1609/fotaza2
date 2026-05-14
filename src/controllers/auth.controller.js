const bcrypt = require("bcrypt");
const User = require("../models/User");

const showRegister = (req, res) => {
    res.render("register");
};

const showLogin = (req, res) => {
    res.render("login");
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.send("El usuario ya existe");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password_hash: hashedPassword
        });

        res.send("Usuario registrado correctamente ");

    } catch (error) {
        console.error(error);

        res.send("Error registrando usuario");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.send("Usuario no encontrado");
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!validPassword) {
            return res.send("Contraseña incorrecta");
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        res.send("Login correcto");

    } catch (error) {
        console.error(error);

        res.send("Error en login");
    }
};

module.exports = {
    showRegister,
    showLogin,
    register,
    login
};