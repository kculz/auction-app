const express = require("express");
const app = express();
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const productsRoute = require("./routes/productRoute");
const cors = require("cors");
const db = require("./models");

const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.get('/', (req, res) => {
    res.send("hello world");
})

app.use('/auth', authRoute);
app.use('/category', categoryRoute);
app.use('/products', productsRoute);


db.sequelize.sync().then(() => {
    app.listen(port, ()=> {
        console.log(`server is running on port http://localhost:${port}`);
    })
})
