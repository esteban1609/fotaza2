const express = require("express");
const sequelize = require("./src/config/sequelize");
const authRoutes = require("./src/routes/auth.routes");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dashboardRoutes = require("./src/routes/dashboard.routes");
const postRoutes = require("./src/routes/post.routes");
const feedRoutes = require("./src/routes/feed.routes");
const commentRoutes = require("./src/routes/comment.routes");
const ratingRoutes = require("./src/routes/rating.routes");
const followRoutes = require("./src/routes/follow.routes");
require("./src/models/User");

require("./src/models/Post");

require("./src/models/Comment");

require("./src/models/Rating");

require("./src/models/Follow");

const sessionStore = new SequelizeStore({
    db: sequelize
});

const app = express();
app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.json({
    limit: "50mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "50mb"
}));

app.use(express.static("./src/public"));

app.use("/uploads", express.static("uploads"));

app.use(session({
    secret: "secreto_super_seguro",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));



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

app.use("/", dashboardRoutes);

app.use("/", postRoutes);    

app.use("/", feedRoutes);

app.use("/", commentRoutes);

app.use("/", ratingRoutes);

app.use("/", followRoutes);


