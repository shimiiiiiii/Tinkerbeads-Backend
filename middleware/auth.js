// const User = require('../models/User');
// const admin = require('../utils/firebase');
// const jwt = require('jsonwebtoken');

// // FIREBASE AUTH
// const isAuthenticatedV2 = async (req, res, next) => {

//     const token = req.headers.authorization.split(" ")[1]
//     // const { token } = req.cookies

//     if (!token) {
//         return res.status(401).json({ message: "Login first to access this resourcessss" })
//     }

//     try {
//         const decodedToken = await admin.auth().verifyIdToken(token);

//         const { email } = decodedToken;

//         req.user = await User.findOne({ email: email });

//         console.log(req.user);

//         next();

//     } catch (error) {
//         res.status(401).json({ message: 'Invalid or expired token' });
//     }



// }

// // JWT TOKEN AUTH
// const isAuthenticated = async (req, res, next) => {

//     if (req.headers.authorization) {
//         req.cookies = {
//             token: req.headers.authorization.split(" ")[1]
//         }
//     }

//     const token = req.cookies?.token
//     // const { token } = req.cookies


//     if (!token) {
//         return res.status(401).json({ message: "Login first to access this resource" })
//     }

//     const data = jwt.verify(token, process.env.JWT_SECRET)

//     // console.log(data);
//     req.user = await User.findById(data.id);

//     // console.log(req.user);

//     next()

// }



// // AUTHORIZATION MIDDLEWARE
// const authorizeRoles = (...roles) => {
//     console.log(roles)
//     return (req, res, next) => {

//         if (!req.user) {

//             return res.status(401).json({ message: "You are not logged in" });
//         }

//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({
//                 message: `Role: ${req.user.role} is not authorized to access this resource`
//             });
//         }

//         next();
//     };
// };

// module.exports = {
//     isAuthenticated,
//     isAuthenticatedV2,
//     authorizeRoles,
// }


const User = require('../models/User');
const admin = require('../utils/firebase');
const jwt = require('jsonwebtoken');

// FIREBASE AUTH
const isAuthenticatedV2 = async (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1]
    // const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: "Login first to access this resourcessss" })
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        const { email } = decodedToken;

        req.user = await User.findOne({ email: email });

        console.log(req.user);

        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}

// JWT TOKEN AUTH
const isAuthenticated = async (req, res, next) => {
    console.log("Auth Headers:", req.headers.authorization);
    
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization;
        console.log("Auth Header Type:", typeof authHeader);
        console.log("Auth Header Length:", authHeader.length);
        
        // Check if it starts with Bearer
        if (authHeader.startsWith('Bearer ')) {
            req.cookies = {
                token: authHeader.split(" ")[1]
            }
            console.log("Extracted token:", req.cookies.token);
        } else {
            console.log("Auth header doesn't start with Bearer");
            return res.status(401).json({ message: "Invalid authorization format" });
        }
    }

    const token = req.cookies?.token

    if (!token) {
        return res.status(401).json({ message: "Login first to access this resource" })
    }

    try {
        console.log("About to verify token");
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified successfully:", data);
        
        req.user = await User.findById(data.id);
        console.log("User found:", req.user ? true : false);
        
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
}

// AUTHORIZATION MIDDLEWARE
const authorizeRoles = (...roles) => {
    console.log(roles)
    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({ message: "You are not logged in" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role: ${req.user.role} is not authorized to access this resource`
            });
        }

        next();
    };
};

module.exports = {
    isAuthenticated,
    isAuthenticatedV2,
    authorizeRoles,
}