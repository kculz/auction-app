const { Category } = require("../models")


async function addCategory(req, res){
    const {name} = req.body;
    try {
        
        // validate 
        if(!name){
            return res.json("Category name is required.")
        }

        const cat = await Category.create({name});

        return res.json({
            msg: "category created",
            data: cat,
            success: true
         })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            error: error.message
        })
    }
}

async function editCategory(req, res) {
    const { id } = req.params;

    const { name } = req.body;

    try {
        
        // check if cat exists
        const cat = await Category.findByPk(id);

        if(!cat){
            return res.json({
                success: false,
                error: "Category not found!"
            });
        }

        cat.name = name;
        await cat.save();

        return res.json({
            success: true,
            msg: "Success",
            data: cat
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            error: error.message
        });
    }
}

async function showCategory(req, res) {
    try {
        // get all categories
        const cats = await Category.findAll();

        return res.json({
            success: true,
            msg: "Success",
            data: cats
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            error: error.message
        })
    }
}

async function removeCategory(req, res) {
    const { id } = req.params;

    try {
        // check if cat exists
        const cat = await Category.findByPk(id);

        if(!cat){
            return res.json({
                success: false,
                error: " Category not found."
            });
        }

        await cat.destroy();

        return res.json({
            success: true,
            msg: "Category deleted."
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            error: error.message
        })
    }
}


module.exports.CategoryController = {
    addCategory, removeCategory, editCategory, showCategory
}