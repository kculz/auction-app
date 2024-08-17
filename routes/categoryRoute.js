const { CategoryController } = require("../controllers/category.Controller");

const router = require("express").Router();


router.get('/', CategoryController.showCategory);
router.post('/add', CategoryController.addCategory);
router.put('/:id', CategoryController.editCategory);


module.exports = router