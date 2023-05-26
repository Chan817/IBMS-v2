// controllers/prospectController.js

const Prospect = require('../models/prospect');

// Controller to fetch customer data
exports.getProspect = (req, res) => {
    Prospect.find()
      .then((prospect) => {
        res.json(prospect);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching customers' });
      });
  };
  
