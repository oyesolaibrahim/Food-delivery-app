const menu = require("../models/menu.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");


const homePage = (req, res) => {
    res.render("index");
}

const menusPage = (req, res) => {
    menu.find()
    .then((menus) => {
        res.render("menus", {menus});
    })
    .catch((error) => {
        res.redirect("/");
    })
}

const aboutPage = (req, res) => {
    res.render("about-us");
}


const createMenuPage = (req, res) => {
    res.render("create_menu", {error: req.flash("errorMsg"), form: req.flash("form")});
}

const menuDetailsPage = (req, res) => {
    const menuId = req.params.menuId;
    menu.findById(menuId)
    .then((menu) => {
        
        res.render("single-menu", {menu});
    })
    .catch(error => {
        console.log(error);
        res.redirect("/");
    })
};


const menuOrderPage = (req, res) => {
    const menuId = req.params.menuId;
    const userId = req.session.userId;
    menu.findById(menuId)
    .then((menu) => {
        User.findById(userId)
        .then((user) => {   
        res.render("menu-order", {menu, error: req.flash("error"), form: req.flash("formData"), user});
    })
    
    .catch(error => {
        console.log(error);
        res.redirect("/menus/" + menuId + "/order");
        //res.redirect("/user/ordered"); 
    }) 
    })
    
    .catch(error => {
        console.log(error);
        res.redirect("/menus/" + menuId + "/order");
        //res.redirect("/user/ordered"); 
    }) 
};


const orderedPage = (req, res) => {
    const menuId = req.params.menuId;
    const quantity = req.body.quantity;
    const location = req.body.location;
   
    if (!quantity) {
        req.flash("error", "Food Quantity is required.");
        req.flash("formData", req.body.quantity);
        return res.redirect("/menus/" + menuId + "/order");
    } else if (!location) {
        req.flash("error", "Please input your location.");
        req.flash("formData");
        return res.redirect("/menus/" + menuId + "/order");
    }
     //else if (quantity.value = "0") {
       // req.flash("error", "Quantity cannot be zero.");
       // req.flash("formData");
        //return res.redirect("/menus/" + menuId + "/order");
   //}

    const orderedData = {
        quantity: req.body.quantity,
        price: req.body.price,
        location:req.body.location, 
        foodDetails:menuId,
        userDetails: req.session.userId
        }
     //Insert data to database
      Order.create(orderedData)
      .then((menus) => {
    //redirect to menu view
          res.redirect("/user/ordered");    
      })
      
      .catch((error) => {
          //console.log(error);
          req.flash("errorMsg", error._message);
          req.flash("form", quantity);
          res.redirect("/menus/" + menuId + "/order");
      })
}



const menuOrderedPage = (req, res) => {
   Order.find({userDetails: req.session.userId})
   .populate("foodDetails")
   .then((menus) => {
        console.log(menus, "orders");
       res.render("order-page", {menus});
   })
   .catch((error) => {
       res.redirect("/");
   })
};

const adminMenuOrderedPage = (req, res) => {
   Order.find()
   .populate("foodDetails")
   .then((menus) => {
        console.log(menus, "orders");
       res.render("order-page", {menus});
   })
   .catch((error) => {
       res.redirect("/");
   })
};

const editMenuPage = (req, res) => {
    const menuId = req.params.menuId;
    menu.findById(menuId)
    .then((menu) => {
        
        res.render("edit_menu", {menu, error: req.flash("error")});
    })
    .catch(error => {
        res.redirect("/");
    })
};

const createMenu = (req, res) => {
    //capture form data
    const data = {
        name: req.body.name,
        price: req.body.price,
        company: req.body.company,
        imageUrl: req.body.image,
        image1Url: req.body.image1,
        image2Url: req.body.image2,
        image3Url: req.body.image3,
        category: req.body.category,
        description: req.body.description,
        admin: req.session.adminId
    }
   //Insert data to database
    menu.create(data)
    .then((menu) => {
  //redirect to product view
        res.redirect("/menus/" + menu._id);    
    })
    .catch((error) => {
        req.flash("errorMsg", error._message);
        req.flash("form", req.body);
        res.redirect("/menus/new");
    })

}

const updateMenu = (req, res) => {
    const menuId = req.params.id;
    const data = {
        name: req.body.name,
        price: req.body.price,
        company: req.body.company,
        imageUrl: req.body.image,
        image1Url: req.body.image1,
        image2Url: req.body.image2,
        image3Url: req.body.image3,
        category: req.body.category,
        description: req.body.description
  }
  menu.updateOne({_id: menuId}, data)
  .then(() => {
      res.redirect("/menus/" + menuId);
  })
  .catch((error) => {
      req.flash("error", error._message);
      res.redirect(`/menus/${menuId}/edit`);
  })
}

const deleteMenu = (req, res) => {
    const menuId = req.params.id;
    menu.findByIdAndDelete(menuId)
    .then(() => {
        res.redirect("/menus");
    })
    .catch((error) => {
        req.flash("error", error._message);
        res.redirect("/menus");
    })
}

module.exports = {
    homePage,
    menusPage,
    createMenuPage,
    menuDetailsPage,
    menuOrderPage,
    menuOrderedPage,
    adminMenuOrderedPage,
    orderedPage,
    editMenuPage,
    createMenu,
    updateMenu,
    deleteMenu,
    aboutPage
}