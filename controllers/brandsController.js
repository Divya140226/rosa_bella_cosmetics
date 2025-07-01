
var brandsModel = require('../models/brandsModel');

async function getAllBrands(req, res) {
    try {
      brandsModel.getAllBrands(req.body, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows);
        }
    });
    } catch (error) {
      console.error('Error fetching brands:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function addBrands(req, res) {
    try {
      brandsModel.addBrands(req.body, function (err, rows) {
       
console.log(err);

        if (err) {
          res.status(500).send({
            message: rows,
          });      
        } 
        else{    
          res.status(200).send({
            status: true,
            message: 'Created Successfully',
          });
        }
    });
    } catch (error) {
      console.error('Error fetching brands:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function getBrandsById(req, res) {
    try {
      brandsModel.getBrandsById(req, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows[0]);
        }
    });
    } catch (error) {
      console.error('Error fetching brands:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function updateBrands(req, res) {
    try {
      brandsModel.updateBrands(req, function (err, rows) {
        if (err) {
          res.status(500).send({
            message: rows,
          });      
        } 
        else{    
          res.status(200).send({
            status: true,
            message: 'Updated Successfully',
          });
        }
    });
    } catch (error) {
      console.error('Error fetching brands:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function deleteBrands(req, res) {
    try {
      brandsModel.deleteBrands(req, function (err, rows) {
        if (err) {
          res.status(500).send({
            message: rows,
          });      
        } 
        else{    
          res.status(200).send({
            status: true,
            message: 'Deleted Successfully',
          });
        }
    });
    } catch (error) {
      console.error('Error fetching brands:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
 


module.exports = {
  getAllBrands,
  addBrands,
  getBrandsById,
  updateBrands,
  deleteBrands,
 
};
