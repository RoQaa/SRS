const express = require('express');
const router=express.Router();
const authController = require(`../controllers/authController`);
const valuesSectionsController = require('../controllers/valuesSectionController');

router.get('/',valuesSectionsController.getValuesSections)
router.get('/:id',valuesSectionsController.getOneValuesSection)
//Protect routes
router.use(authController.protect)

router.route('/')
.post(valuesSectionsController.constraint,valuesSectionsController.uploadValuesSectionsImages,valuesSectionsController.resizeValuesSectionsImages,valuesSectionsController.addValuesSection)
//.get(valuesSectionsController.getValuesSections)

router.route('/:id')
//.get(valuesSectionsController.getOneValuesSection)
.patch(valuesSectionsController.checkValuesSectionExists,valuesSectionsController.uploadValuesSectionsImages,valuesSectionsController.resizeValuesSectionsImages,valuesSectionsController.updateValuesSection)
.delete(valuesSectionsController.deleteValuesSection)


module.exports = router;