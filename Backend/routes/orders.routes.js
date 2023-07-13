module.exports = rs => {
  const router = require("express").Router();
  const controller = require("../controller/orders.controller")

  
  // Orders endpoints

  router.post('/add-order', controller.createOrder); // ADD ORDER

  router.get('/get-all-orders', controller.getAllOrders); // GET ALL ORDERS

  router.get('/:id', controller.getAllOrders); // GET ALL ORDERS

  router.put('/:id', controller.updateOrder)// UPDATE 1 ORDER
 
  router.delete('/delete-all-orders', controller.deleteAllOrders); // DELETE ALL ORDERS
  
  router.delete('/:id', controller. deleteOrder); // DELETE 1 ORDER
 
  
  rs.use('/v1/orders',router)  
}