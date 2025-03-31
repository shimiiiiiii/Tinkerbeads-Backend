// const Product = require('../models/Product');
// const cloudinary = require('cloudinary');
// const mongoose = require('mongoose');

// // CREATE PRODUCT
// exports.create = async (req, res, next) => {

//     try {

//         // console.log(req.body);
//         // console.log(req.files);

//         // EMPTY ARRAY PARA SA IMAGES
//         req.body.images = [];

//         const images = req.files;

//         for (let i = 0; i < images.length; i++) {

//             const data = await cloudinary.v2.uploader.upload(images[i].path);

//             // console.log(data);

//             req.body.images.push({

//                 public_id: data.public_id,
//                 url: data.url,

//             })
//         }

//         const product = await Product.create(req.body);

//         res.json({
//             message: "Product created successfully.",
//             product: product,
//         })


//     } catch (error) {

//         console.log(error)

//         return res.json({
//             message: 'System error occured.',
//             success: false,
//         })
//     }

// }


// // UPDATE PRODUCT
// exports.updateProduct = async (req, res, next) => {

//     try {

//         // console.log(req.body);
//         // console.log(req.params);
//         // console.log(req.files);

//         const images = req.files;

//         // console.log(images);

//         req.body.images = [];

//         for (let i = 0; i < images.length; i++) {

//             const data = await cloudinary.v2.uploader.upload(images[i].path);

//             console.log(data);

//             req.body.images.push({

//                 public_id: data.public_id,

//                 url: data.url,

//             })
//         };

//         // DELETE EMPTY ARRAY KAPAG HINDI NAG UPDATE NG IMAGES
//         if (images.length === 0) {
//             delete req.body.images
//         }

//         const product = await Product.findByIdAndUpdate(req.params.id, req.body);

//         res.json({
//             message: "Product successfully updated.",
//             product: product,
//         })

//     } catch (error) {

//         console.log(error);

//         return res.json({
//             message: 'System error occured.',
//             success: false,
//         })


//     }

// }


// // GET SINGLE PRODUCT BY ID
// exports.getSingleProduct = async (req, res, next) => {
//     try {
//         const { id } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: "Invalid Product ID" });
//         }

//         const product = await Product.findById(id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.json({
//             message: "Single product retrieved!",
//             product,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "System error occurred", success: false });
//     }
// };


// // GET ALL PRODUCTS
// exports.getAllProducts = async (req, res, next) => {

//     try {

//         const products = await Product.find();

//         res.json({
//             message: "Products retrieved.",
//             products: products,
//         })

//     } catch (error) {

//         console.log(error);

//         return res.json({
//             message: 'System error occured.',
//             success: false,
//         })


//     }

// }


// // DELETE PRODUCT
// exports.deleteProduct = async (req, res, next) => {

//     try {

//         await Product.findByIdAndDelete(req.params.id)

//         res.json({
//             message: "Product deleted successfully."
//         })

//     } catch (error) {

//         console.log(error)

//         return res.json({
//             message: 'System error occured.',
//             success: false,
//         })


//     }

// }


// // BULK DELETE
// // exports.bulkDelete = async (req, res, next) => {
// //     try {

// //         // console.log(req.body.productIds);

// //         await Product.deleteMany({
// //             _id: {
// //                 $in: req.body.productIds, //$in array pang store ng iddedelete na product id
// //             }
// //         });

// //         res.json({
// //             message: "Products deleted successfully!",
// //         })

// //     } catch (error) {

// //         console.log(error);

// //         return res.json({
// //             message: 'System error occured.',
// //             success: false,
// //         })

// //     }
// // }

const Product = require('../models/Product');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

// CREATE PRODUCT
exports.create = async (req, res, next) => {

    try {

        // console.log(req.body);
        // console.log(req.files);

        // EMPTY ARRAY PARA SA IMAGES
        req.body.images = [];

        const images = req.files;

        for (let i = 0; i < images.length; i++) {

            const data = await cloudinary.v2.uploader.upload(images[i].path);

            // console.log(data);

            req.body.images.push({

                public_id: data.public_id,
                url: data.url,

            })
        }

        const product = await Product.create(req.body);

        res.json({
            message: "Product created successfully.",
            product: product,
        })


    } catch (error) {

        console.log(error)

        return res.json({
            message: 'System error occured.',
            success: false,
        })
    }

}


// UPDATE PRODUCT
exports.updateProduct = async (req, res, next) => {

    try {

        // console.log(req.body);
        // console.log(req.params);
        // console.log(req.files);

        const images = req.files;

        // console.log(images);

        req.body.images = [];

        for (let i = 0; i < images.length; i++) {

            const data = await cloudinary.v2.uploader.upload(images[i].path);

            console.log(data);

            req.body.images.push({

                public_id: data.public_id,

                url: data.url,

            })
        };

        // DELETE EMPTY ARRAY KAPAG HINDI NAG UPDATE NG IMAGES
        if (images.length === 0) {
            delete req.body.images
        }

        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        res.json({
            message: "Product successfully updated.",
            product: product,
        })

    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured.',
            success: false,
        })


    }

}


// GET SINGLE PRODUCT BY ID
exports.getSingleProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({
            message: "Single product retrieved!",
            product,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "System error occurred", success: false });
    }
};


// GET ALL PRODUCTS
exports.getAllProducts = async (req, res, next) => {

    try {

        const products = await Product.find();

        res.json({
            message: "Products retrieved.",
            products: products,
        })

    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured.',
            success: false,
        })


    }

}


// DELETE PRODUCT
exports.deleteProduct = async (req, res, next) => {

    try {

        await Product.findByIdAndDelete(req.params.id)

        res.json({
            message: "Product deleted successfully."
        })

    } catch (error) {

        console.log(error)

        return res.json({
            message: 'System error occured.',
            success: false,
        })


    }

}

// GET ALL PRODUCTS IN A CATEGORY
exports.getProductsByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });

        if (!products.length) return res.status(404).json({ message: "No products found in this category." });
        
        res.json({ message: "Products retrieved.", products });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'System error occurred.', success: false });
    }
};

// GET ONE PRODUCT PER CATEGORY WITH FIRST IMAGE
exports.getOneProductPerCategory = async (req, res, next) => {
    try {
        const categories = await Product.distinct("category");

        const products = await Promise.all(
            categories.map(async (category) => {
                const product = await Product.findOne({ category }).select("name category images");
                return product ? { 
                    category: category, 
                    product: product, 
                    firstImage: product.images.length > 0 ? product.images[0].url : null 
                } : null;
            })
        );

        res.json({
            message: "One product per category retrieved successfully.",
            products: products.filter(Boolean), 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "System error occurred.",
            success: false,
        });
    }
};


// BULK DELETE
// exports.bulkDelete = async (req, res, next) => {
//     try {

//         // console.log(req.body.productIds);

//         await Product.deleteMany({
//             _id: {
//                 $in: req.body.productIds, //$in array pang store ng iddedelete na product id
//             }
//         });

//         res.json({
//             message: "Products deleted successfully!",
//         })

//     } catch (error) {

//         console.log(error);

//         return res.json({
//             message: 'System error occured.',
//             success: false,
//         })

//     }
// }