const express = require('express');
const router=express.Router();
const authController = require(`../controllers/authController`);
const middleSectionController = require('../controllers/middleSectionController');

router.get('/',middleSectionController.getMids)
router.get('/:id',middleSectionController.getOneMiddleSection)
//Protect routes
router.use(authController.protect)

router.route('/')
.post(middleSectionController.uploadMiddleSectionImage,middleSectionController.resizeMiddleSectionImage,middleSectionController.addMiddleSection)

router.route('/:id')
//.get(middleSectionController.getOneMiddleSection)
.patch(middleSectionController.checkMiddleSectionExists,middleSectionController.uploadMiddleSectionImage,middleSectionController.resizeMiddleSectionImage,middleSectionController.updateMiddleSection)
.delete(middleSectionController.deleteMiddleSection)


module.exports = router;