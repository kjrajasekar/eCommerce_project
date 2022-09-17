const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
 _name: { type: String, required: true,trim:true },
 _model: { type: String, required: true,trim:true  },
 _category: { type: String,  required: true,trim:true},
 _size: { type: String, required: true,trim:true},
  _color: { type: String, required: true,trim:true },
  _price: { type: Number, required: true,trim:true },
  _image:{data: Buffer,
    contentType: String},
 });

module.exports = mongoose.model("products", productSchema);