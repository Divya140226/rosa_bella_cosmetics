
var cartItemModel = require('../models/cartItemModel');

async function getAllCartItem(req, res) {
    try {
      cartItemModel.getAllCartItem(req.body, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows);
        }
    });
    } catch (error) {
      console.error('Error fetching cartItem:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function addCartItem(req, res) {
    try {
      cartItemModel.addCartItem(req.body, function (err, rows) {
       

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
      console.error('Error fetching cartItem:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function getCartItemById(req, res) {
    try {
      cartItemModel.getCartItemById(req, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows[0]);
        }
    });
    } catch (error) {
      console.error('Error fetching cartItem:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
async function updateCartItem(req, res) {
    try {
        cartItemModel.updateCartItem(req, function (err, result) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: 'Failed to update cart item',
                    error: err
                });
            }

            res.status(200).json({
                status: true,
                message: 'Cart item updated successfully'
            });
        });
    } catch (error) {
        console.error('Update Error:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

async function deleteCartItem(req, res) {
    try {
        cartItemModel.deleteCartItem(req, function (err, result) {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: 'Failed to delete cart item',
                    error: err
                });
            }

            res.status(200).json({
                status: true,
                message: 'Cart item deleted successfully'
            });
        });
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

module.exports = {
  getAllCartItem,
  addCartItem,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
  
};
