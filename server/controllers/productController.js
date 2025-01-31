const fs =require('fs');
const multer = require('multer');
const sharp = require('sharp');
const Product = require('../models/productModel');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require(`../utils/filterObj`);
const AppError = require('../utils/appError');

// Multer configuration
const multerFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
  };
  
  const multerStorage = multer.memoryStorage();
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  
  // Middleware to upload multiple types of images
  exports.uploadProductsImages = upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]);
  
 // Middleware to resize and retain the original format
 exports.resizeNewsImages = catchAsync(async (req, res, next) => {
   console.log("Files received:", req.files); // ✅ Log incoming files
 
   if (!req.files || (!req.files.thumbnail && !req.files.images)) return next();
   const timestamp = Date.now();
   const id = req.user?.id; // Ensure ID is available
 
   // ✅ Check if thumbnail exists before processing
   if (req.files.thumbnail) {
     const bgMetadata = await sharp(req.files.thumbnail[0].buffer).metadata();
     const bgExt = bgMetadata.format;
 
     const thumbnailFilename = `thumbnail-${id}-${timestamp}.${bgExt}`;
     await sharp(req.files.thumbnail[0].buffer)
       .resize(2000, 1333)
       .toFile(`public/products/thumbnails/${thumbnailFilename}`);
 
     req.body.thumbnail = `public/products/thumbnails/${thumbnailFilename}`;
   }
 
   // ✅ Check if images exist before processing
   if (req.files.images) {
     req.body.images = await Promise.all(
       req.files.images.map(async (file, i) => {
         const fileMetadata = await sharp(file.buffer).metadata();
         const fileExt = fileMetadata.format;
         const filename = `new-${id}-${timestamp}-${i + 1}.${fileExt}`;
 
         await sharp(file.buffer)
           .resize(2000, 1333)
           .toFile(`public/products/imgs/${filename}`);
 
         return `public/products/imgs/${filename}`;
       })
     );
   }
 
   next();
 });
  
exports.AddProduct=catchAsync(async(req,res,next)=>{
    const data = await Product.create(req.body);
    res.status(201).json({
        status:true,
        message:"product created Successfully",
       // data
    })
});

exports.getProducts=catchAsync(async(req,res,next)=>{
    const data = await Product.find();
    if(!data||data.length===0) return next(new AppError(`data n't found`,404));
    res.status(200).json({
        status:true,
        data
    })
});

exports.getOneProduct=catchAsync(async(req,res,next)=>{
    const data = await Product.findById(req.params.id);
    if(!data) return next(new AppError(`data n't found`,404));
    res.status(200).json({
        status:true,
        data
    })
})

exports.updateProduct=catchAsync(async(req,res,next)=>{
    if(req.files.thumbnail)  fs.unlink(`${req.product.thumbnail}`, (err) => {});
    if(req.files.images)  req.product.images.map(image=>{fs.unlink(`${image}`, (err) => {console.log("error of removing images",err)});})

        req.product.set(req.body); // Update the fields of the document
        const updatedProduct = await req.product.save(); // Save the changes

    res.status(200).json({
        status:true,
        message:"product updated successfully",
      //  data:updatedProduct
    })

})

exports.deleteProduct= catchAsync(async(req,res,next)=>{
    const doc = await Product.findById(req.params.id);


    if (!doc) return next(new AppError('Data not found', 404));
    fs.unlink(`${doc.thumbnail}`, (err) => {console.log("error of removing thumbnail",err)});
  
    doc.images.map(image=>{
      fs.unlink(`${image}`, (err) => {console.log("error of removing images",err)});
    })

  await  doc.deleteOne();
  res.status(200).json({
    status:true,
    message:"Product deleted Successfully"
  })
})

exports.checkProductExists = async (req, res, next) => {
    const doc = await Product.findById(req.params.id);
    if (!doc) {
      return next(
        new AppError('Data Not Found', 404)
      );
    }
    req.product=doc;
    next();
  };
  