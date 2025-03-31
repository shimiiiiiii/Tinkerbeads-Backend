const mongoose = require('mongoose');

const productModel = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Product Name is required."],
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    category: { 
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                "Bracelet",
                'Necklace',
                'Keychain',
            ],
            message: 'Please select correct category for product'
        }
    },

 
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },

            url: {
                type: String,
                required: true,
            }
        }
    ],

    sell_price: {
        type: Number,
        required: true,
    },

    cost_price: {
        type: Number,
        required: true,
    },

    stock_quantity: {
        type: Number,
        required: true,
        default: 0,
    }

}, { timestamps: true });



module.exports = mongoose.model('Product', productModel)