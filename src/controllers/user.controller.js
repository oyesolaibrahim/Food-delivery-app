const User = require("../models/user.model"); 
const bcrypt = require("bcrypt");
const menu = require("../models/menu.model");

const userSignupPage = (req, res) => {
    res.render("user_signup", {error: req.flash("error"), form: req.flash("formData")});
}
const addUser = (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user) {
            req.flash("error", "A User with the same email address already exists.");
            req.flash("formData", req.body);
            return res.redirect("/signup");
        }
        
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const userData = {
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
        location: req.body.location,
        password: hashPassword
    }
    User.create(userData)
    .then((user) => {
        console.log(user);
        res.redirect("/user/login");
    })
    .catch((err) => {
        req.flash("error", err._message);
        req.flash("formData", req.body);
        res.redirect("/signup");
        })
    })
    .catch((error) => {
        req.flash("error", error._message);
        req.flash("formData", req.body);
        return res.redirect("/signup");
    })
}


const userLoginPage = (req, res) => {
    res.render("user_login", {error: req.flash("error"), form: req.flash("formData")});
}

const userLogin = (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        req.flash("error", "Email and password are required.");
        req.flash("formData", req.body);
        return res.redirect("/user/login");
    }

    User.findOne({email})
    .then((user) => {
        console.log(user);
        if (!user) {
            req.flash("error", "User account with the given email does not exist.");
            req.flash("formData", req.body);
            return res.redirect("/user/login");            
        } else if (!bcrypt.compareSync(password, user.password)) {
            req.flash("error", "Incorrect Password.");
            req.flash("formData", req.body);
             return res.redirect("/user/login");
        }
        req.session.userId = user._id;
        res.redirect("/user/profile");
    })
    .catch(error => {
        req.flash("error", error._message);
        req.flash("formData", req.body);
        return res.redirect("/user/login");
    })
}


const userProfilePage = (req, res) => {
    User.findOne({_id: req.session.userId})
    .then((admin) => {
        menu.find({user: req.session.adminId})
        .then((menus) => {
            res.render("user_profile", {profile: admin, menus});
        })
        .catch(error => {
           req.flash("error", error._message);
           return res.redirect("/user/login");
        })
    })
    .catch(error => {
       req.flash("error", error._message);
       return res.redirect("/user/login"); 
    })
}

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
}

module.exports = {
    userSignupPage,
    addUser,
    userLogin,
    userLoginPage,
    userProfilePage,
    logout
}