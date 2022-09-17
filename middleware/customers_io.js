const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customerModel = require('../model/customer');
const productsModel = require('../model/products');

const addCustomer = async (req, res) => {
    try {
        const { _name, _phone, _email, _password, _dob, _doj, _address, _image } = req.body;
        if (!(_name && _phone && _email && _password && _dob && _doj)) {
            res.status(400).send({ message: "All inputs required" });
        }

        const oldCustomer = await customerModel.findOne({ _email });
        if (oldCustomer) {
            return res.status(409).send({ message: "User Already Exist. Please Login" });
        }

        encryptedPassword = await bcrypt.hash(_password, 10);
        const user = await customerModel.create({
            _name, _phone, _email: _email.toLowerCase(), _password: encryptedPassword,
            _dob, _doj, _image, _address,
        });

        const token = jwt.sign(
            { user_id: user._id, _email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        );
        user._token = token;
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Invalid Credentials" });
    }
}

const customerlogin = async (req, res) => {
    try {
        const { _email, _password } = req.body;
        if (!(_email && _password)) {
            res.status(400).send({ message: "All inputs required" });
        }
        const user = await customerModel.findOne({ _email });
        if (user && (await bcrypt.compare(_password, user._password))) {
            const token = jwt.sign(
                { _id: user._id, _email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );
            user._token = token;
            res.status(200).json(user);
        } else {
            res.status(400).send({ message: "password mismatch" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "User not exist please register" });
    }
}


const getCategory = async (req, res) => {
    try {
        let result = new Set();
        const response = await productsModel.find();
        response.filter(response => result.add(response._category))
        res.status(200).send(JSON.stringify([...result]));
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Invalid Credentials" });
    }
}

const getProducts = async (req, res) => {
    try {
        const response = await productsModel.find();
        let result = response.filter(response => response._category.toLowerCase() === req.params._category.toLowerCase())
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Invalid Credentials" });
    }
}


module.exports = {
    customerlogin,
    addCustomer,
    getCategory,
    getProducts
}