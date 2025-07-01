const multer = require('multer');
const uniqid = require('uniqid'); 
const path = require('path');
const fs = require('fs');

// Define the dynamic folder name generator function
const generateDynamicFolderName = (req, file, cb) => {
  const folderName = req.params.folderName || 'default'; 
  const destinationFolder = path.join('uploads', folderName);
  if (!fs.existsSync(destinationFolder)) {
    console.log(destinationFolder,"dis");
    
    fs.mkdirSync(destinationFolder, { recursive: true });
  }
    cb(null, destinationFolder);

};

// Configure Multer to use the dynamic folder name generator
const storage = multer.diskStorage({
  destination: generateDynamicFolderName,
  filename: (req, file, cb) => {
    cb(null,req.params.name_merge+Date.now() + uniqid() + path.extname(file.originalname))
}
});

const upload = multer({ storage: storage });
module.exports=upload;



