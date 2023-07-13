const db = require("../models")
const Customer = db.customer


// Customers

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
      const { email, password, fname, deliveryAddress, contact } = req.body;
      const customer = new Customer({ email, password, fname, deliveryAddress, contact });
      await customer.save();
      res.status(201).json({ message: 'Customer created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Get all customers
  exports.getAllCustomers = async (req, res) => {      //The was const , I replaced with ""exports.""
    try {
      const customers = await Customer.find();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Get a customer by ID
  exports.getCustomerById = async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.findById(id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  // Update a customer by ID
  exports.updateCustomer = async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password, fname, shippingAddress, contactNumber } = req.body;
      const customer = await Customer.findByIdAndUpdate(
        id,
        { email, password, fname, shippingAddress, contactNumber },
        { new: true }
      );
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Delete a customer by ID
  exports.deleteCustomer = async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.findByIdAndDelete(id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  // Delete all customers
  exports.deleteAllCustomers = async (req, res) => {
    try {
      await Customer.deleteMany();
      res.json({ message: 'All customers deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };