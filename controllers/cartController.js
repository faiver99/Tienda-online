const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving cart', error: err });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [], total: 0 });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        cart.total += product.price * quantity;
        await cart.save();
        res.status(201).json({ message: 'Product added to cart', cart });
    } catch (err) {
        res.status(500).json({ message: 'Error adding to cart', error: err });
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.total -= cart.items[itemIndex].product.price * cart.items[itemIndex].quantity;
            cart.items.splice(itemIndex, 1);
            await cart.save();
            res.json({ message: 'Product removed from cart', cart });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error removing from cart', error: err });
    }
};

exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.total -= cart.items[itemIndex].product.price * cart.items[itemIndex].quantity;
            cart.items[itemIndex].quantity = quantity;
            cart.total += cart.items[itemIndex].product.price * quantity;
            await cart.save();
            res.json({ message: 'Cart item updated', cart });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating cart item', error: err });
    }
};
