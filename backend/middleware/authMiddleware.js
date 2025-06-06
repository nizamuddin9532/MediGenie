const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async(req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};