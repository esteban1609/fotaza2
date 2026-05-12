const express = require("express");
const sequelize = require("./src/config/sequelize");
const authRoutes = require("./src/routes/auth.routes");

const app = express();
app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 3000;

app.use("/", authRoutes);

sequelize.sync()
    .then(() => {
        console.log("Base de datos sincronizada ");

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error conectando BD:", error);
    });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});