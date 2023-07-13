const db = require("../models");
// const ROLES = db.ROLES;
const Trader = db.trader;

checkDuplicateEmail = (req, res, next) => {
  
    // Email
    Trader.findOne({
      email: req.body.email
    }).exec((err, trader) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (trader) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
};

const verifySignUp = {
  checkDuplicateEmail,
};

module.exports = verifySignUp;