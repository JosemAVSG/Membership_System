const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const adminSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
});

module.exports = Mongoose.model("users", adminSchema)