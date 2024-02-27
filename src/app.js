const express = require("express");
const app = express();
//const menus = require("./menus.json");
const mongoose = require("mongoose");
const menu = require("./models/menu.model");
//const Admin = require("./models/admin.model");
const bodyParser = require("body-parser");
//const { log } = require("console");
const flash = require("connect-flash");
const session = require("express-session");
 const methodOverride = require("method-override"); 
const adminAuth = require ("./middleware/admin.middleware");
const userAuth = require ("./middleware/user.middleware");

mongoose.connect("mongodb://0.0.0.0:27017/ciouz_store")
.then(() => {
    console.log("Database connected successfully!");
})
.catch((err) => {
    console.log("Error connecting to DB:", err.message);
});

app.use(session({
    secret: "#ciouzfood",
    resave: true,
    saveUninitialized: false
}));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.locals.adminSession = req.session.adminId;
    next();
})

app.use((req, res, next) => {
    res.locals.userSession = req.session.userId;
    next();
})

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const {homePage, aboutPage, menusPage, createMenuPage, menuDetailsPage, orderedPage, menuOrderedPage, adminMenuOrderedPage, menuOrderPage, editMenuPage, createMenu, updateMenu, deleteMenu} = require("./controllers/menu.controller");

const {signupPage, addAdmin, loginPage, login, profilePage, logout} = require("./controllers/admin.controller");

const {userSignupPage, addUser, userProfilePage, userLogin, userLoginPage} = require("./controllers/user.controller");

app.get("/", homePage);
app.get("/about-us", aboutPage);
app.get("/menus", menusPage);
app.get("/menus/new", adminAuth, createMenuPage);
app.get("/menus/:menuId", menuDetailsPage);
app.get("/menus/:menuId/order", menuOrderPage);
app.get("/user/ordered", menuOrderedPage);
app.get("/admin/ordered", adminMenuOrderedPage);
app.get("/menus/:menuId/edit", adminAuth, editMenuPage);
app.post("/menus", adminAuth, createMenu);
app.put("/menus/:id", adminAuth, updateMenu);
app.delete("/menus/:id", adminAuth, deleteMenu);

app.get("/signup", userSignupPage);
app.get("/admin/signup", signupPage);
//app.get("/user/order", orderPage);
//app.get("/user/ordered", menuOrderedPage);
app.get("/admin/login", loginPage);
app.get("/user/login", userLoginPage);
app.get("/admin/profile", adminAuth, profilePage);
app.get("/user/profile", userAuth, userProfilePage);

app.post("/admin/logout", logout);
app.post("/admin/signup", addAdmin);
app.post("/signup", addUser);
app.post("/admin/login", login);
app.post("/user/login", userLogin);
//app.post("/user/order", orderedPage);
app.post("/menus/:menuId/order", orderedPage);
//app.post("/menus/ordered", menuOrderPage);

app.listen(3000, () => {
    console.log("App is now running");
});
