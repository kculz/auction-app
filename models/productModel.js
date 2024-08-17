module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    Product.associate = (models) => {
        Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category'});
    }

    return Product;
}