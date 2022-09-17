const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const hashKey = 10;

const customerSchema = new mongoose.Schema({
  _name: { type: String, required: true, trim: true },
  _phone: { type: Number, required: true, trim: true, unique: true },
  _email: { type: String, unique: true, required: true, trim: true },
  _password: { type: String, required: true, trim: true },
  _dob: { type: Date, required: true, trim: true },
  _address: { type: String, default: null },
  _doj: { type: Date, required: true, trim: true },
  _image: {
    data: Buffer,
    contentType: String
  },
  _token: { type: String, default: null }
});
//change to middleware-
customerSchema.pre('save', function (next) {
  // this.password = bcrypt.hashSync(this._password, hashKey);
  next();
});

module.exports = mongoose.model("CustomerDetails", customerSchema);