
const pool = require('./db');

// const { toTitleCase } = require('../lib/common-function/toTittleCase');


var categories = {
    getAllCategories: function (req, callback) {
        pool.query("SELECT * FROM categories", function (err, result) {
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
   
    addCategories: function (req, callback) {
  
      
        pool.query("INSERT INTO categories (name,description) VALUES ($1,$2)", [req.name,req.description], function (err, result) {
           // console.log(err,result );
          
            response={
                status:false,
                message:"Error!! while Inserting datas"
            }
            if (err) {
           console.log(err,"req" );
                callback(err, response);
            }
                else if(result.rowCount==0){
                callback("Error!!",response);

                }else {
                 
                callback(null, result);
            }

        });

    },
    getCategoriesById: function (req, callback) {
        
        pool.query("SELECT * FROM categories  where id=$1",[req.params.id], function (err, result) {
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
    updateCategories: function (req, callback) {
        const { name,  description } = req.body;
        const{id}=req.params;
        pool.query("UPDATE categories SET name=$1, description=$2 WHERE id =$3", [name,description,  id], function (err, result) {
            //console.log(err,"update");
            
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
 deleteCategories: function (req, callback) {
        pool.query(
            `DELETE FROM categories WHERE id=$1`,
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

module.exports = categories;