const Order = require('../models/Order');
const Cart = require('../models/Cart');
const stripe = require('../config/stripe');

exports.createOrder = async (req, res) => {
    const { paymentMethod, shippingAddress, stripeToken } = req.body;
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Procesar el pago con Stripe
        const charge = await stripe.charges.create({
            amount: cart.total * 100, // Stripe usa centavos
            currency: 'usd',
            source: stripeToken,
            description: `Order for ${req.user.email}`,
            metadata: { order_id: new Order()._id.toString() }
        });

        const order = new Order({
            user: req.user._id,
            items: cart.items,
            total: cart.total,
            paymentMethod,
            shippingAddress,
            status: 'pending',
            paymentStatus: 'paid',
            paymentDetails: charge
        });

        await order.save();
        // Clear the cart after placing the order
        await Cart.findOneAndDelete({ user: req.user._id });

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (err) {
        res.status(500).json({ message: 'Error creating order', error: err });
    }
};
