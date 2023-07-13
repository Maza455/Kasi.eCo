 // Product schema

module.exports = mongoose => {
  //  const ObjectID = mongoose.Schema.Types.ObjectId;

const productsSchema = new mongoose.Schema({



   p_name: {
     type: String,
     required: true
   },
   price: {
     type: Number,
     required: true
   },
   description: {
     type: String,
     required: true
   },
   category: {
    type: String,
   },
   image: {
    type: String
   },
   createdBy: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Trader'
   }

});

    productsSchema.method("toJSON", function() {
        const{__v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
       });


let Product = mongoose.model('Product', productsSchema);
return Product

}