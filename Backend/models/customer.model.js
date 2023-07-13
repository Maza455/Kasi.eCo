module.exports = mongoose => {
const customerSchema = new mongoose.Schema({


    item_name: {
        type: String,
        require: true
     },
     desc:{
        type: String,
        require: true
     },
     img: {
      type: String,
      required: false,
    },
    // Additional fields specific to customers
    seller: {
      type: String,
      required: true
    }
    
});

    customerSchema.method("toJSON", function() {
        const{__v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
       });

let Customer = mongoose.model('Customer', customerSchema);
return Customer

}