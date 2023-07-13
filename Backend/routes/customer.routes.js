module.exports = rs => {
    const router = require("express").Router();
    const controller = require("../controller/customer.controller")

    // Customer endpoints

   router.post('/customer-signup', controller.createCustomer); // ADD CUSTOMER

   router.get('/get-all-customers', controller.getAllCustomers); // GET ALL CUSTOMERS

   router.get('/:id', controller.getCustomerById); // GET 1 TRADER

   router.put('/:id', controller.updateCustomer)// UPDATE 1 CUSTOMERS

   router.delete('/delete-all-customers', controller.deleteAllCustomers); // DELETE ALL CUSTOMERS

   router.delete('/:id', controller.deleteCustomer); // DELETE 1 CUSTOMERS
  
  rs.use('/v1/customers',router)  
}