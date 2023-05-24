const Customer = require('../models/customer');

// Controller to fetch customer data
exports.getCustomers = (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching customers' });
    });
};
