const fs =require('fs');
const multer = require('multer');
const sharp = require('sharp');
const  MiddleSection = require('../models/middleSectionModel');
const { catchAsync } = require('../utils/catchAsync');
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


// Multer upload instance with size limit
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
    },
});

// Middleware to upload multiple types of images
exports.uploadMiddleSectionImage = upload.single('backgroundImg')


exports.resizeMiddleSectionImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    const timestamp = Date.now();
    const id = req.user ? req.user.id : 'guest'; // Fallback if user ID isn't available

    // Get the original file extension
    const fileMetadata = await sharp(req.file.buffer).metadata();
    const fileExt = fileMetadata.format;

    // Generate the file name
    const middleSectionFilename = `middleSection-${id}-${timestamp}.${fileExt}`;

    // Save the resized image
    const outputPath = `public/middleSections/imgs/${middleSectionFilename}`;
    await sharp(req.file.buffer)
        .resize(2000, 1333) // Resize dimensions
        .toFile(outputPath);

    // Attach the file path to the request body
    req.body.backgroundImg = `public/middleSections/imgs/${middleSectionFilename}`; // Relative path for saving in DB

    next();
});


exports.addMiddleSection=catchAsync(async(req,res,next)=>{
    const doc = await MiddleSection.create(req.body);
    res.status(201).json({
        status:true,
        message:"Middle-section created Successfully",
        data:doc
    })
})


exports.getMids=catchAsync(async(req,res,next)=>{
    const data= await MiddleSection.find();
    if(!data||data.length===0) return next(new AppError(`data n't found`,404));
    res.status(200).json({
        status:true,
        data
    })
})

exports.getOneMiddleSection=catchAsync(async(req,res,next)=>{
    const data= await MiddleSection.findById(req.params.id);
    if(!data||data.length===0) return next(new AppError(`data n't found`,404));
    res.status(200).json({
        status:true,
        data
    })
})

exports.updateMiddleSection=catchAsync(async(req,res,next)=>{
    if(req.file)  fs.unlink(`${req.middleSection.backgroundImg}`, (err) => {});
   
       req.middleSection.set(req.body); // Update the fields of the document
       const updatedMiddleSection = await req.middleSection.save(); // Save the changes
       
       res.status(200).json({
           status:true,
           message:"MiddleSection Updated Successfully",
           doc:updatedMiddleSection
       })
   })
   
   exports.deleteMiddleSection=catchAsync(async(req,res,next)=>{
       const doc = await MiddleSection.findById(req.params.id);
   
   
       if (!doc) return next(new AppError('Data not found', 404));
       fs.unlink(`${doc.backgroundImg}`, (err) => {console.log("error of removing image",err)});
   
     await  doc.deleteOne();
     res.status(200).json({
       status:true,
       message:"MiddleSection deleted Successfully"
     })
   })
   
   exports.checkMiddleSectionExists = async (req, res, next) => {
       const doc = await MiddleSection.findById(req.params.id);
       if (!doc) {
         return next(
           new AppError('Data Not Found', 404)
         );
       }
       req.middleSection=doc;
       next();
     };
     
     