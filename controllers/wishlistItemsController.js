
var wishlistItemsModel = require('../models/wishlistItemsModel');


async function getAllWishlistItems(req, res) {
  try {
    wishlistItemsModel.getAllWishlistItems(function (err, result) {
      if (err) {
        return res.status(500).json(result);
      } else {
        return res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Error fetching wishlistItems:', error);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

async function addWishlistItems(req, res) {
  try {
    wishlistItemsModel.addWishlistItems(req.body, function (err, rows) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: rows,
        });
      } else {
        res.status(200).send({
          status: true,
          message: 'Created Successfully',
        });
      }
    });
  } catch (error) {
    console.error('Error fetching wishlistItems:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
  async function getwishlistItemsById(req, res) {
    try {
      wishlistItemsModel.getwishlistItemsById(req, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows[0]);
        }
    });
    } catch (error) {
      console.error('Error fetching wishlistItems:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
async function updatewishlistItems(req, res) {
    try {
        wishlistItemsModel.updatewishlistItems(req, function (err, result) {
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

async function deleteWishlistItems(req, res) {
  try {
    wishlistItemsModel.deleteWishlistItems(req, function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Failed to delete wishlist item',
          error: err
        });
      }

      res.status(200).json({
        status: true,
        message: 'Wishlist item deleted successfully'
      });
    });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
}


module.exports = {
  getAllWishlistItems,
  addWishlistItems,
  getwishlistItemsById,
  updatewishlistItems,
  deleteWishlistItems,
  
};
