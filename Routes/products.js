const express = require('express')
const productController = require('../Controllers/product')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __basedir + '/resources/static/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname )
    }
})
const upload = multer({ storage : storage })

const router = express.Router()

// ROUTES
router.route('/')
    .get(productController.GetALL)
    .post(upload.single('file'), productController.Create)
    .delete(productController.DeleteAll)

router.route('/:id')
    .get(productController.GetById)
    .patch(productController.UpdateById)
    .delete(productController.DeleteById)

module.exports = router;
