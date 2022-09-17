const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminModel = require('../model/admin');
const customerModel = require('../model/customer');

const adminSignup = async (req, res) => {
    try {
        const { _name, _phone, _email, _password, _dob, _doj, _address, _image } = req.body;
        if (!(_name && _phone && _email && _password && _dob && _doj)) {
            res.status(400).send({ message: "All inputs required" });
        }

        const oldCustomer = await adminModel.findOne({ _email });
        if (oldCustomer) {
            return res.status(409).send({ message: "User Already Exist. Please Login" });
        }

        encryptedPassword = await bcrypt.hash(_password, 10);
        const user = await adminModel.create({
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
        res.status(201).send({ message: "success", data: user });
    } catch (err) {
        console.log(err);
    }
}

const adminSignin = async (req, res) => {
    try {
        const { _email, _password } = req.body;
        if (!(_email && _password)) {
            res.status(400).send({ message: "All inputs required" });
        }
        const user = await adminModel.findOne({ _email });
        if (user && (await bcrypt.compare(_password, user._password))) {
            const token = jwt.sign(
                { user_id: user._id, _email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );
            user._token = token;
            res.status(200).json({ message: "success", data: user });
        } else {
            res.status(400).send({ message: "Password mismatch" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "User not exist please register" });
    }
}

const showCustomers = async (req, res) => {
    try {
        const customers = await customerModel.find();
        res.status(200).json(customers);
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Invalid Credentials" });
    }
}

module.exports = {
    adminSignin,
    adminSignup,
    showCustomers
}