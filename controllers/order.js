const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

// Create a new order
// filepath: c:\3rd Year\backend\Backend-tinkerbeads-rn\controllers\order.js
exports.createOrder = async (req, res) => {
    try {
        const { cartItems, shippingAddress, paymentMethod, subtotal, shipping, total } = req.body;

        // Debugging: Log the request body
        console.log('Request Body:', req.body);

        // Set the user ID from the authenticated user (assuming req.user is set after authentication)
        const userId = req.user._id;

        // Create the order
        const order = await Order.create({
            user: userId,
            cartItems,
            shippingAddress,
            paymentMethod,
            subtotal,
            shipping,
            total,
            orderNumber: 'TB-' + Math.floor(100000 + Math.random() * 900000), // Generate a unique order number
        });

        // Update stock for each product in the order
        for (const item of cartItems) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${item.productId} not found.`,
                });
            }
        
            // Subtract the ordered quantity from the stock
            product.stock_quantity -= item.quantity;
        
            // Ensure stock does not go below zero
            if (product.stock_quantity < 0) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product: ${product.name}`,
                });
            }
        
            // Save the updated product
            await product.save();
        }

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the order.',
            error: error.message,
        });
    }
};

// Get all orders for the authenticated user
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user is set after authentication

        const orders = await Order.find({ user: userId }).populate({
            path: 'cartItems.productId',
            select: 'name sell_price category images', 
        })
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders.',
            error: error.message,
        });
    }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({
                path: 'cartItems.productId',
                select: 'name images price category',
            })
            .populate({
                path: 'user',
                select: 'firstName lastName email',
            });

        res.status(200).json({
            success: true,
            message: 'Order list retrieved successfully.',
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders.',
            error: error.message,
        });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Validate the status value
        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value.',
            });
        }

        // Find the order by ID and update its status
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found.',
            });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully.',
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to update order status.',
            error: error.message,
        });
    }
};