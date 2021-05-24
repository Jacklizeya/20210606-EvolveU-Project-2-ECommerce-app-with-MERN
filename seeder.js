//    This is a separate script just used to import data
const dotenv = require("dotenv")
dotenv.config()

require("./models/databaseSetup")
const mongoose = require("mongoose")

const colors = require("colors")
//    the seeding data in data folder
const users = require("./data/users")
const products = require("./data/products")
//    the mapping data in mongoose
const Product = require("./models/productModel")
const Order = require("./models/orderModel")
const User = require("./models/userModel")

//  This is going to import dotenv

//  This is going to make the connection script running



const importData = async() => {
    try {
        // clean the database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        // insert user database first
        const createdUsers = await User.insertMany(users)
        // add the user property for all the products before uploading to cloud
        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map(product => {return {...product, user: adminUser}})
        await Product.insertMany(sampleProducts)
        console.log("data imported successfully".green.inverse)
        process.exit()
    }
    catch (error) {console.log(`${error}`.red.inverse);process.exit(1)}

}

const destroyData = async() => {
    try {
        // clean the database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("data destroyed".red.inverse)
        process.exit()
    }
    catch (error) {console.log(`${error}`.red.inverse);process.exit(1)}
}

if (process.argv[2] === "-d") {destroyData()} else {importData()}