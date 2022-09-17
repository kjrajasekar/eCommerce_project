const productsModel = require('../model/products');

const addProduct = async (req, res) => {
    try {
        const { _name, _model, _category, _size, _color, _price, _image } = req.body;
        if (!(_name && _model && _category && _size && _size && _color && _price)) {
            res.status(400).send("All input is required");
        }

        const product = await productsModel.create({
            _name, _model, _size, _category, _color, _price, _image: req._image,
        });
        res.status(201).json({ message: "product added successfully", data: product });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Invalid Credentials" });
    }
}

const updateProduct = async (req, res) => {
    try {
        const response = await productsModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
        res.status(200).json({ messgae: "Product updated successfully", data: response });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Invalid Credentials" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const response = await productsModel.findByIdAndDelete(req.params._id);
        res.status(200).json({ message: "product deleted", data: response });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Invalid Credentials" });
    }
}


module.exports = {
    addProduct,
    updateProduct,
    deleteProduct
}