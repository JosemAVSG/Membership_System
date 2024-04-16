const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    fechaRegistro: Date,
    estado: Boolean,
});

module.exports = Mongoose.model("users", userSchema)