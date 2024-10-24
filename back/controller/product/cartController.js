const Cart = require('../../model/product/cart');
const Product = require('../../model/product/product');

exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const cartItemIndex = cart.items.findIndex(item => item.product.equals(productId));

        if (cartItemIndex > -1) {
            cart.items[cartItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price: product.price 
            });
        }

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
};
