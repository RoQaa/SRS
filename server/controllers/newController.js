const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');
const path = require("path");
const New = require('../models/newModel');
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
exports.uploadNewsImages = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

// Middleware to resize and retain the original format
exports.resizeNewsImages = catchAsync(async (req, res, next) => {

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
      .toFile(`public/news/thumbnails/${thumbnailFilename}`);

    req.body.thumbnail = `public/news/thumbnails/${thumbnailFilename}`;
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
          .toFile(`public/news/imgs/${filename}`);

        return `public/news/imgs/${filename}`;
      })
    );
  }

  next();
});
//Controllers
exports.createNew = catchAsync(async (req, res, next) => {

  //Token protectd for author
  req.body.author = req.user.id;
  const doc = await New.create(req.body);
  res.status(201).json({
    status: true,
    message: "New is created Successfully",
    //data: doc
  })
});

exports.getNews = catchAsync(async (req, res, next) => {
  const data = await New.find();
  if (!data) return next(new AppError(`Data Not Found`, 404))
  res.status(200).json({
    status: true,
    length: data.length,
    data
  })
});

exports.getMyNews = catchAsync(async (req, res, next) => {
  const data = await New.find({ author: req.user.id });
  if (!data) return next(new AppError(`Data Not Found`, 404))
  res.status(200).json({
    status: true,
    length: data.length,
    data
  })
})
exports.getOneNew = catchAsync(async (req, res, next) => {
  const data = await New.findById(req.params.id);
  if (!data) return next(new AppError(`Data Not Found`, 404))
  res.status(200).json({
    status: true,
    data
  })
})


exports.updateNew = catchAsync(async (req, res, next) => {

  //param and token id
  const doc = await New.findById(req.params.id);
  if (!doc) return next(new AppError(`Data Not Found`, 404))

  const filteredBody = filterObj(req.body, 'title', 'title_ar', 'description', 'description_ar', 'images', 'thumbnail', 'published');
  if (filteredBody.thumbnail) fs.unlink(`${doc.thumbnail}`, (err) => { console.log("error of removing thumbnail", err) });
  if (filteredBody.images) filteredBody.images.map(image => { fs.unlink(`${image}`, (err) => { console.log("error of removing images", err) }); })

  Object.assign(doc, filteredBody);
  await doc.save(); // Save the updated document

  res.status(200).json({
    status: true,
    message: "new updated Successfully",
    //doc
  })
})

exports.deleteNew = catchAsync(async (req, res, next) => {

  const doc = await New.findOne({ _id: req.params.id, author: req.user.id });


  if (!doc) return next(new AppError('Data not found', 404));
  fs.unlink(`${doc.thumbnail}`, (err) => { console.log("error of removing thumbnail", err) });

  doc.images.map(image => {
    fs.unlink(`${image}`, (err) => { console.log("error of removing images", err) });
  })
  await doc.deleteOne();
  res.status(200).json({
    status: true,
    message: "New Deleted Successfully",
  });
});


exports.deleteNewByAdmin = catchAsync(async (req, res, next) => {

  const doc = await New.findById(req.params.id);


  if (!doc) return next(new AppError('Data not found', 404));
  fs.unlink(`${doc.thumbnail}`, (err) => { console.log("error of removing thumbnail", err) });

  doc.images.map(image => {
    fs.unlink(`${image}`, (err) => { console.log("error of removing images", err) });
  })
  await doc.deleteOne();
  res.status(200).json({
    status: true,
    message: "New Deleted Successfully",
  });
});


exports.checkNewExists = async (req, res, next) => {
  const doc = await New.findOne({ _id: req.params.id, author: req.user.id })
  if (!doc) {
    return next(
      new AppError('Data Not Found', 404)
    );
  }
  next();
};
