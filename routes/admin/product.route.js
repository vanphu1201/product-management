const express = require("express");
const router = express.Router();


// multer
const multer  = require('multer');
const upload = multer();
// end multer



// valiedate
const validate = require("../../validates/admin/product.validate");
// end validate


// uploadCloud
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// end uploadCloud

const controller = require("../../controllers/admin/product.controller");

router.get('/', controller.index);

router.post('/change-status/:status/:id', controller.changeStatus);

router.post('/change-multi', controller.changeMulti);

router.post('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post(
    '/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost,
);

router.get('/edit/:id', controller.edit);

router.post(
    '/edit/:id',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch
);

router.get('/detail/:id', controller.detail);


module.exports = router;