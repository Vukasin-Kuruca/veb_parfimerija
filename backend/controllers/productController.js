import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } },
                { category: { $regex: req.query.search, $options: 'i' } },
            ],
        }
        : {};

    const categoryFilter = req.query.category
        ? { category: req.query.category }
        : {};

    const products = await Product.find({ ...keyword, ...categoryFilter });
    res.json(products);
});


const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Proizvod nije pronađen");
    }

});


const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Naziv parfema',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: '',
        category: 'Uniseks parfemi',
        countInStock: 0,
        numReviews: 0,
        description: 'Opis parfema',
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand ?? product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock ?? product.countInStock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Proizvod nije pronađen");
    }
});


const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: "Proizvod je uklonjen" });
    }
    else {
        res.status(404);
        throw new Error("Proizvod nije pronađen");
    }
});


const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Već ste ostavili recenziju za ovaj proizvod');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Recenzija je dodata' });
    } else {
        res.status(404);
        throw new Error('Proizvod nije pronađen');
    }
});

export {
    getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview
};