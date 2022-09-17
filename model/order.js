const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _name: { type: String, required: true, trim: true },
  _model: { type: String, required: true, trim: true },
  _category: { type: String, required: true, trim: true },
  _size: { type: String, required: true, trim: true },
  _color: { type: String, required: true, trim: true },
  _price: { type: Number, required: true, trim: true },
  _image: {
    data: Buffer,
    contentType: String
  },
  _qty: { type: String, required: true, trim: true },
  _customerid: { type: String, required: true, trim: true },
  _totalprice: { type: String, required: true, trim: true },
  _orderdate: { type: Date, required: true, trim: true },
  _status: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("orderdetails", orderSchema);