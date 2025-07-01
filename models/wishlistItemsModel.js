
const pool = require('./db');

// const { toTitleCase } = require('../lib/common-function/toTittleCase');


var WishlistItems = {
     getAllWishlistItems: function (callback) {
    pool.query("SELECT w.*, pt.* FROM wishlist_items w  LEFT JOIN profile_users p ON w.user_id = p.id LEFT JOIN product pt ON w.product_id = pt.id", function (err, result) {
      if (err) {
        const response = {
          status: false,
          message: "Error!! while fetching data"
        };
        callback(err, response);
      } else {
        callback(null, {
          status: true,
          message: "Wishlist items fetched successfully",
          data: result.rows
        });
      }
    });
  },
   
    addWishlistItems: function (req, callback) {
    pool.query(
      "INSERT INTO wishlist_items (user_id, product_id) VALUES ($1, $2)",
      [req.user_id, req.product_id],
      function (err, result) {
        const response = {
          status: false,
          message: "Error!! while inserting data"
        };

        if (err) {
          callback(err, response);
        } else if (result.rowCount === 0) {
          callback("Error!!", response);
        } else {
          callback(null, result);
        }
      }
    );
  },
   getwishlistItemsById: function (req, callback) {
        
        pool.query("SELECT w.*, pt.* FROM wishlist_items w  LEFT JOIN profile_users p ON w.user_id = p.id LEFT JOIN product pt ON w.product_id = pt.id where w.id=$1",[req.params.id], function (err, result) {
            response={
                status:false,
                message:"Error!! while fetching datas"
            }
            if (err) {
         
                callback(err, response);
            }
                else if(result.rowCount==0){
                callback("Error!!",response);

                } else {
               
                callback(null, result.rows);

           
            }

        });

    },
    // Update cart item
updatewishlistItems: function (req, callback) {
    const { user_id, product_id } = req.body;
    const id = req.params.itemId;

    pool.query(
        "UPDATE wishlist_item s SET user_id = $1, product_id = $2 WHERE id = $3",
        [user_id, product_id, id],
        function (err, result) {
            const response = {
                status: false,
                message: "Error!! while updating data"
            };

            if (err) {
                callback(err, response);
            } else if (result.rowCount === 0) {
                callback("No matching record found", response);
            } else {
                callback(null, result);
            }
        }
    );
},

// Delete cart item
deleteWishlistItems: function (req, callback) {
    const id = req.params.itemId;

    pool.query(
      "DELETE FROM wishlist_items WHERE id = $1",
      [id],
      function (err, result) {
        if (err) {
          callback(err, "Error!! while deleting data");
        } else if (result.rowCount === 0) {
          callback("No record found to delete", "Error!!");
        } else {
          callback(null, result);
        }
      }
    );
  }



}

module.exports = WishlistItems;