const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  cartItems: [
    {
      productId: { type: mongoose.Schema.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    enum: ['gcash', 'cod'], 
    required: true,
  },
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  total: { type: Number, required: true },
  orderNumber: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);