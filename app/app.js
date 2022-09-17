const parser = require('body-parser');
const express = require("express");
require("../config/database").connect();
const customer = require('../middleware/customers_io')
const admin = require('../middleware/admin_io');
const products = require('../middleware/products-io')
const orders = require('../middleware/order_io')
const { isAuthorized } = require("./../config/auth-jwt");
var multer = require('multer');
var messagebird = require('messagebird')('uwHdrS2KnXhcZYnmhNpZdhrKa');

const app = express()
app.use(parser.urlencoded({ extended: true, limit: '50mb' }));
app.use(parser.json({ limit: '50mb', extended: false }
))

var storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, './uploads'); },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });


app.get("/", async (req, res) => {
  console.log("client connected")
  res.status(201).json({ message: "success" });
})

app.get("/otp", async (req, res) => {
  console.log("otp connected")
var msg="";
  messagebird.messages.create({
    originator : '+918248877006',
    recipients : [ '+919940881848' ],
    body : 'Hello World, I am a text message and I was hatched by Javascript code!'
 },function (err, response) {
  if (err) {
     console.log("ERROR:");
     console.log(err);
     msg="error"
 } else {
     console.log("SUCCESS:");
     console.log(response);
     msg="sucess"
 }
});
  res.status(201).json({ message: msg });
})

//customer api
// app.post('/customer/signin', customer.customerlogin)
// app.post('/customer/signup', upload.single('_image'), customer.addCustomer)
// app.get('/customer/categories', isAuthorized, customer.getCategory)
// app.get('/customer/products/:_category', isAuthorized, customer.getProducts)
// app.post('/customer/order', isAuthorized, orders.placeOrder)
// app.get('/customer/orderslist/:_id', isAuthorized, orders.showOrders)
// app.get('/customer/orderslists', orders.getOrders)


// totest sedhu
app.post('/customer/signin', customer.customerlogin)
app.post('/customer/signup', upload.single('_image'), customer.addCustomer)
app.get('/customer/categories',  customer.getCategory)
app.get('/customer/products/:_category' , customer.getProducts)
app.post('/customer/order', orders.placeOrder)
app.get('/customer/orderslist/:_id', orders.showOrders)
app.get('/customer/orderslists', orders.getOrders)
//admin api
app.post('/admin/signin', admin.adminSignin)
app.post('/admin/signup', admin.adminSignup)
app.get('/admin/customers', isAuthorized, admin.showCustomers)
// app.post('/admin/status', isAuthorized,admin.showStatus)
// app.post('/admin/pending', isAuthorized,admin.showPending)

//products Api
app.post('/products/addproduct', upload.single('_image'), products.addProduct)
app.put('/products/update/:_id', products.updateProduct)
app.delete('/products/delete/:_id', products.deleteProduct)


module.exports = app;