 // Orders schema

module.exports = mongoose => {
const ordersSchema = new mongoose.Schema({


  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

    ordersSchema.method("toJSON", function() {
        const{__v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
       });


let Order = mongoose.model('Order', ordersSchema);
return Order

}