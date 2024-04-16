const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: String,
    email: String,
    phone:String,
    fechaRegistro: Date,
    estado: Boolean
});

module.exports = mongoose.model("users", clientSchema)