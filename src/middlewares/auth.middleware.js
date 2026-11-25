
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};

const isAdmin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    if (req.session.user.role !== "admin") {
        req.session.message = {
            type: "danger",
            text: "No tenés permisos para acceder a esta sección"
        };

        return res.redirect("/");
    }

    next();
};

module.exports = {
    isAuthenticated,
    isAdmin
};
