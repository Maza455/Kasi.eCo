// const mongoose = require("mongoose");

module.exports = mongoose => {

 const schemaUser = mongoose.Schema({

     fname: {
        type: String,
        require: true
     },
     email:{
        type: String,
        require: true
     },
     password:{
        type: String,
        require: true
     },
   //   role: {
   //      type: String,
   //      enum: ['Trader', 'Customer'],
   //      required: true
   //   }

       });

    schemaUser.method("toJSON", function() {
                const{__v, _id, ...object } = this.toObject();
                object.id = _id;
                return object;

    });

let User = mongoose.model('User', schemaUser);
return User


}

