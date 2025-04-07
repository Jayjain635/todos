const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {

    const authHeader = req.headers.authorization; 
    if (!authHeader) {
        return res.json({ success: false, message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token after 'Bearer '
    if (!token) {
        return res.json({ success: false, message: "Not authorized to update, Login first" });
    }

    try {
        const tokenDecode =jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.body.id = tokenDecode.id;
        } else {
            return res.json({ success: false, message: "Not authorized. Login again" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

module.exports = { userAuth };
