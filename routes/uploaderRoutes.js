const express = require('express');
const router = express.Router();
const upload = require("../uploader");
const fs=require("fs");

router.post('/upload-single/:name_merge/:folderName', upload.single('file'), (req, res) => {
  //console.log(req,'file');
  try {
    if (!req.file) {
    //  console.log(req.file,"jjkjk");
      
      return res.status(400).send({ status:false,message:'No file uploaded.' });
    }

    //console.log(req.file);

    //const API_URL = req.protocol + '://' + req.get('host') + '/';
    res.send({ status:true,message: 'Image uploaded successfully.', image_path: req.file.path.replace(/^uploads\//, '') });
  } catch (error) {
    console.error('Error during file upload:', error.message);

    // Handle specific errors
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send({status:false,message: 'File size exceeded the limit.' });
      }
      // Handle other Multer errors as needed
    } else if (error) {
      return res.status(500).send({status:false,message: 'Internal server error.' });
    }

    // Handle other generic errors
    res.status(500).send({ status:false,message: 'Internal server error.' });
  }
});

router.post('/upload-multiple/:name_merge/:folderName', upload.array('file', 6), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ status:false,message:'No file uploaded.' });
    }

    // Process the uploaded files
   // console.log(req.files);

    //const API_URL = req.protocol + '://' + req.get('host') + '/';
    res.send({
      status:true,
      message: 'Images uploaded successfully.',
      image_path: req.files.map(file => file.path.replace(/^uploads\//, ''))
    });
  } catch (error) {
    console.error('Error during file upload:', error.message);

    // Handle specific errors
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send({ status:false,message: 'File size exceeded the limit.' });
      }
      
    } else if (error) {
      return res.status(500).send({ status:false,message: 'Internal server error.' });
    }

  
    res.status(500).send({status:false,message:'Internal server error.' });
  }
});
router.post('/delete',(req, res) => {
  try{
    fs.unlinkSync(`./uploads/${req.body.image_path}`);
    res.send({status:true,message:'Image deleted successfully.'});
  }
  catch(err){
    console.log(err);
    res.send({status:false,message:'Error in Delete'});
  }
  
});
module.exports = router;
