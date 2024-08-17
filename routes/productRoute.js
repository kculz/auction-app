const { ProductController } = require("../controllers/productController");

const router = require("express").Router();

router.post('/show', ProductController.showProduct)
router.post('/add', ProductController.addProduct)
router.patch('/editProduct/:id', ProductController.editProduct)
router.delete('/removeProduct/:id', ProductController.removeproduct)


module.exports = router