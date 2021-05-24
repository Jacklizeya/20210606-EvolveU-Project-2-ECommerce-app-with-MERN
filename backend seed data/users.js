const bcrypt = require("bcryptjs")

const users = [
    // user #1
    {name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true, },
    // user #2
    {name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    },
    // user #3
    {name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
    },
]

module.exports = users