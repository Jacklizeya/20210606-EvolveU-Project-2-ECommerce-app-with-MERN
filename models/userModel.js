const mongoose = require ("mongoose")
const bcrypt = require("bcryptjs")
// mongoose.Schema is like a class
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }, 
}, {timestamps: true})
// userSchema is an object, this is a special syntax
// a mistake, user.methods !!!
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
//  The Id is unique, you can change username and password
    if (!this.isModified("password")) {next()}


    const salt = await bcrypt.genSalt(10)
    //10rounds to generate salt
    this.password = await bcrypt.hash(this.password, salt)
})



const User = mongoose.model("User", userSchema)

module.exports = {User}