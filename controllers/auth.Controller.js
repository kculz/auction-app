const { User } = require("../models");
const bcrypt = require("bcryptjs");

async function register(req, res) {
    const { fullname, username, password, email} = req.body;

    try {
        // check if user exists
        const user = await User.findOne({
            where: {email}
        });

        if( user) {
            return res.json("User already exists");
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname, username, password: hashedPassword, email
        });

        return res.json("User created.")

        
    } catch (error) {
        console.log(error)
    }
}


async function login(req, res){
    const {username, password} = req.body;

    try {
        
        const user = await User.findOne({where: {username}});

        if(!user){
            return res.json("Invalid credential.");
        }

        // compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.json("Invalid credential.");
        }

        return res.json("login successful.");
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    register, login
}