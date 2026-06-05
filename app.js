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
const userRoutes = require("./src/routes/user.routes");
const favoriteRoutes = require("./src/routes/favorite.routes");
const notificationRoutes = require("./src/routes/notification.routes");
const Notification = require("./src/models/Notification");
const reportRoutes = require("./src/routes/report.routes");
const interestRoutes = require("./src/routes/interest.routes");
const collectionRoutes = require("./src/routes/collection.routes");

//importación de modelos
require("./src/models/User");

require("./src/models/Post");

require("./src/models/Comment");

require("./src/models/Rating");

require("./src/models/Follow");

require("./src/models/Favorite");

require("./src/models/Notification");

require("./src/models/Report");

require("./src/models/Interest");

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
        maxAge: 1000 * 60 * 60 * 24,

        httpOnly: true
    }
}));



const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {

    res.locals.message = req.session.message;

    req.session.message = null;

    next();
});

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

    app.use(async (req, res, next) => {

    res.locals.unreadNotifications = 0;

    if (req.session.user) {

        res.locals.unreadNotifications =
            await Notification.count({

                where: {

                    UserId: req.session.user.id,

                    read: false
                }
            });
    }

    next();
});


app.use("/", dashboardRoutes);

app.use("/", postRoutes);    

app.use("/", feedRoutes);

app.use("/", commentRoutes);

app.use("/", ratingRoutes);

app.use("/", followRoutes);

app.use("/", favoriteRoutes);

app.use("/", notificationRoutes);

app.use("/", reportRoutes);

app.use("/", interestRoutes);

app.use("/", collectionRoutes);

app.use("/", userRoutes);


