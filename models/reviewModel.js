
const pool = require('./db');

// const { toTitleCase } = require('../lib/common-function/toTittleCase');


var reviews = {
    getAllReviews: function (req, callback) {
        pool.query(`SELECT o.*, 
              p.*, pt.*
        FROM reviews o
        LEFT JOIN profile_users p ON o.user_id = p.id
        LEFT JOIN product pt ON o.product_id = pt.id`, function (err, result) {
            if (err) {
                response={
                    status:false,
                    message:"Error!! while fetching datas"
                }
         
                callback(err,response);
            }
               else {
               
                callback(null, result.rows);

            }

        });

    },
   
    addReviews: function (req, callback) {
  
      
        pool.query("INSERT INTO reviews (user_id,product_id,rating,review_text) VALUES ($1,$2,$3,$4)", [req.user_id,req.product_id,req.rating,req.review_text], function (err, result) {
        console.log(err,result );
              console.log(req,"req" );
            response={
                status:false,
                message:"Error!! while Inserting datas"
            }
            if (err) {
         
                callback(err, response);
            }
                else if(result.rowCount==0){
                callback("Error!!",response);

                }else {
                 
                callback(null, result);
            }

        });

    },
    getReviewsById: function (req, callback) {
        
        pool.query(`SELECT o.*, 
              p.*, pt.*
        FROM reviews o
        LEFT JOIN profile_users p ON o.user_id = p.id
        LEFT JOIN product pt ON o.product_id = pt.id  where o.id=$1`,[req.params.id], function (err, result) {
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
    updateReviews: function (req, callback) {
        const { user_id, product_id, rating,review_text} = req.body;
        const{id}=req.params;
        pool.query(`UPDATE reviews SET user_id=$1, product_id=$2, rating=$3, review_text=$4 WHERE id =$5`, [user_id, product_id, rating,review_text, id], function (err, result) {
            console.log(err,"update");
            
            response={
                status:false,
                message:"Error!! while updating datas"
            }
            if (err) {
         
                callback(err,response);
            }
                else if(result.rowCount==0){
                callback("Error!!",response);

                } else {
               
                callback(null, result);
            }
        

        });

    },
    deleteReviews: function (req, callback) {
        pool.query(
            `DELETE FROM reviews WHERE id=$1`,
            [req.params.id],
            function (err, result) {
                if (err) {
                    
                    callback(err, 'Error!! while Deleting datas');
                } else if (result.rowCount == 0) {
                    callback('Error!! while Deleting datas', 'Error!!');
                } else {
                    callback(null, result);
                }
            }
        );
    },
}

module.exports = reviews;