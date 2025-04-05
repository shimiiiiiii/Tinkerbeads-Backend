const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const orderController = require('../controllers/order');
const { isAuthenticatedV2, isAuthenticated,  authorizeRoles} = require('../middleware/auth');


// Create a new order
router.post('/create-order', isAuthenticated, orderController.createOrder);

// Get all orders for the authenticated user
router.get('/my-orders', isAuthenticated, orderController.getUserOrders);

// Get all orders (admin only)
router.get('/admin-orders', isAuthenticated, authorizeRoles('admin'), orderController.getAllOrders);
router.put('/admin-orders-update', isAuthenticated, authorizeRoles('admin'), orderController.updateOrderStatus);
module.exports = router;