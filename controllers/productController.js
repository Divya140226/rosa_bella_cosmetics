
var productModel = require('../models/productModel');

async function getAllProduct(req, res) {
    try {
      productModel.getAllProduct(req.body, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows);
        }
    });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function addProduct(req, res) {
    try {
      productModel.addProduct(req.body, function (err, rows) {
       

        if (err) {
          console.log(err);
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
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function getProductById(req, res) {
    try {
      productModel.getProductById(req, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows[0]);
        }
    });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function updateProduct(req, res) {
    try {
      productModel.updateProduct(req, function (err, rows) {
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
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function deleteProduct(req, res) {
    try {
      productModel.deleteProduct(req, function (err, rows) {
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
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

async function searchProductByName(req, res) {
  try {
    productModel.searchProductByName(req.query, function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: ' while sErrorearching product',
          error: err
        });
      }

      // ✅ Success response format
      res.json({
        status: true,
        message: 'Products retrieved successfully',
        data: result.data
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
async function filterProduct(req, res) {
  try {
    productModel.filterProduct(req, function (err, rows) {
      if (err) {
        return res.json({
          status: false,
          message: 'Error fetching products',
          error: err
        });
      }

      res.json(rows);
    });
  } catch (error) {
    console.error('Error in filterProduct:', error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
}
module.exports = {
  getAllProduct,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductByName,
  filterProduct
};
