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
            req.session.message = {
                type: "warning",
                text: "El usuario ya existe"
            };

            return res.redirect("/register");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const existingEmail = await User.findOne({

            where: {
                email
            }
        });

        if (existingEmail) {

            req.session.message = {
                type: "warning",
                text: "El email ya está registrado"
            };

            return res.redirect("/register");
        }

        const existingUsername = await User.findOne({

            where: {
                username
            }
        });

        if (existingUsername) {

            req.session.message = {
                type: "warning",
                text: "El nombre de usuario ya existe"
            };

            return res.redirect("/register");
        }

        await User.create({
            username,
            email,
            password_hash: hashedPassword
        });

        req.session.message = {
            type: "success",
            text: "Usuario registrado correctamente"
        };

        return res.redirect("/login");

    } catch (error) {
        console.error(error);

        req.session.message = {
            type: "danger",
            text: "Error registrando usuario"
        };

        return res.redirect("/register");
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
            req.session.message = {
                type: "danger",
                text: "El usuario ya existe"
            };

return res.redirect("/register");
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!validPassword) {
           req.session.message = {
                type: "danger",
                text: "Contraseña incorrecta"
            };

            return res.redirect("/login");
                    }

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        res.redirect("/");

    } catch (error) {
        console.error(error);

        res.send("Error en login");
    }
};
const logout = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");
    });
};

module.exports = {
    showRegister,
    showLogin,
    register,
    login,
    logout
};