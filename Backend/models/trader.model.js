module.exports = mongoose => {
const traderSchema = new mongoose.Schema({


    fname: {
        type: String,
        require: true
     },
     cell: String,
     
     businessName: {
      type: String,
      required: true
    },

    address: {
      type: String,
      // required: true
    },

    image: {
      type: String,
      default: 'https://www.pngitem.com/pimgs/m/82-824451_transparent-supplier-icon-png-team-work-icon-transparent.png'
    },

     email:{
        type: String,
        require: true
     },
     password:{
        type: String,
        require: true
     },
     
    // Additional fields specific to traders
   
    inventory: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        // Additional inventory fields...
      }
    ],
   
});

 traderSchema.method("toJSON", function() {
        const{__v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
       });


let Trader = mongoose.model('Trader', traderSchema);
return Trader

}