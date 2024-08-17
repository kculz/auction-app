const { Product, Category } = require("../models");

const addProduct = async(req, res) => {

    const { name, price, category_id } = req.body;

    try {
        // validate
        if(!name || !price || !category_id){
            return res.json({
                success: false,
                error: "Please make sure all fields are provided."
            });
        }

        // check if product exists
        const product = await Product.findOne({where: {name}});

        if(product){
            return res.json({
                success: false,
                error: "Product already exists.",
                data: product
            });
        }

        // create new product
        const newProduct = await Product.create({
            name,
            price,
            category_id
        })

        if(!newProduct){
            return res.json({
                success: false,
                error: "Failed to add product.",
            });
        }

        return res.json({
            success: true,
            msg: "Product created",
            data: newProduct
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            error: error.message
        })
    }
}
//removing a product
async function removeproduct(req, res){

    const { id } = req.params;
    try{
        // remove a product
        const product =await Product.findByPk(id);

        if(!product){
            return res.json({
                success: false,
                error: "Product not found."
            });
        }

        await product.destroy();

        return res.json({
            success:true,
            msg:"Product deleted"
        });
    }catch (error){
        console.log(error);
        return res.json({
            success:false,
            error: ErrorEvent.message
        })
    }
}
// show products
async function showProduct(req, res) {
    try {
        // show all products
        const products = await Product.findAll({
            include: [
                { model: Category, as: "category" }
            ]
        });

        return res.json({
            success: true,
            msg: "Success",
            data: products
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            error: error.message
        })
    }
}

async function editProduct(req, res) {
    const { id } = req.params;

    const { name, price, category_id } = req.body;

    try {
        
        // check if product exists
        const product = await Product.findByPk(id);

        if(!product){
            return res.json({
                success: false,
                error: "product not found!"
            });
        }

        product.name = name;
        await product.save();

        return res.json({
            success: true,
            msg: "Success",
            data: product
        })
        
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            error: error.message
        });
    }
}


module.exports.ProductController = {
    addProduct, showProduct, editProduct, removeproduct
}