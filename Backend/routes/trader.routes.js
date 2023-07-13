module.exports = traderBridge => {
    const router = require("express").Router();
    const controller = require("../controller/trader.controller")

   // Trader endpoints

   router.post('/signup', controller.createTrader); // ADD TRADER

   router.post('/signin', controller.signin); // ADD TRADER


   router.get('/', controller.getAllTraders); // GET ALL TRADERS

   router.get('/:id', controller.getTraderById); // GET 1 TRADER

   router.put('/:id', controller.updateTrader)// UPDATE 1 TRADER

   router.delete('/delete-all', controller.deleteAllTraders); // DELETE ALL TRADERS  

   router.delete('/:id', controller.deleteTrader); // DELETE 1 TRADER

   router.post("/inventory/:id", controller.createInventoryProduct) // Create Inventory Product
  
  traderBridge.use('/v1/traders',router)  
}