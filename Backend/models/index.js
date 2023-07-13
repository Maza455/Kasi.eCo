const mongoose = require('mongoose')
//const dbConfig = require('../config/db.config');

mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;
db.role = require("./role.model");
db.user = require("./user.model")(mongoose);
db.trader = require("./trader.model")(mongoose);
db.customer = require("./customer.model")(mongoose);
db.products = require("./products.model")(mongoose);
db.orders = require("./orders.model")(mongoose);
// db.role = require("./role.model")(mongoose);

// db.ROLES = ["user", "admin", "moderator"];


module.exports = db;