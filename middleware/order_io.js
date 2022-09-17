const orderModel = require('../model/order')
const moment = require('moment')

const placeOrder = async (req, res) => {
    try {
        const { _name, _model, _category, _size, _color, _price, _image, _qty, _customerid, _totalprice,
            _orderdate, _status, } = req.body;

        if (!(_name && _model && _category && _size && _color && _price && _qty &&
            _customerid && _totalprice && _orderdate && _status)) {
            res.status(400).send({ message: "All inputs required" });
        }
        const order = await orderModel.create({
            _name, _model, _category, _size, _color, _price, _image, _qty,
            _customerid, _totalprice, _orderdate: moment(new Date(_orderdate)).format(), _status
        });
        res.status(201).json({ message: "success", data: order });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Invalid Credentials" });
    }
}

const showOrders = async (req, res) => {
    try {
        const response = await orderModel.find();
        let result = response.filter(response => response._customerid === req.params._id)
        res.status(200).send({ message: "success", data: result });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Invalid Credentials" });
    }
}

const getOrders = async (req, res) => {
    try {
        let { startDate, endDate } = req.query;
         if(startDate === '' || endDate === '') {
         return res.status(400).json({ message: 'Invalid Credentials' })
             }
         console.log({ startDate, endDate});
      
      const transactions = orderModel.find({ 
        date_paid: {
              $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
              $lt: new Date(new Date(endDate).setHours(23, 59, 59))
               }
        }).sort({ date_paid: 'asc'})  
        console.log(transactions);
      if(!transactions) {
      return res.status(404).json({
       status:'failure',
       message:'Could not retrieve transactions'
      })
      }
            
      res.status(200).json({
      status:'success',
      data: transactions
         })
      
      } catch(error) {
        return res.status(500).json({
           status:'failure',
           error: error.message
              })
       }
      
      }

module.exports = {
    placeOrder, showOrders,getOrders
}
