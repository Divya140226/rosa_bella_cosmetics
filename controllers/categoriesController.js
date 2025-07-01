
var categoriesModel = require('../models/categoriesModel');

async function getAllCategories(req, res) {
    try {
      categoriesModel.getAllCategories(req.body, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows);
        }
    });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function addCategories(req, res) {
    try {
      categoriesModel.addCategories(req.body, function (err, rows) {
       //console.log(err);
       

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
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function getCategoriesById(req, res) {
    try {
      categoriesModel.getCategoriesById(req, function (err, rows) {
        if (err) {
            res.json(rows);
        } else {
            req.headers['x-access-token'] = rows['token'];
            res.json(rows[0]);
        }
    });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function updateCategories(req, res) {
    try {
      categoriesModel.updateCategories(req, function (err, rows) {
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
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function deleteCategories(req, res) {
    
    try {
      categoriesModel.deleteCategories(req, function (err, rows) {
        console.log(req);
        
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
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  


module.exports = {
  getAllCategories,
  addCategories,
  getCategoriesById,
  updateCategories,
  deleteCategories,
 
};
